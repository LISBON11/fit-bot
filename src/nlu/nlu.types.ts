/**
 * Описание одного подхода упражнения
 */
export interface ParsedSet {
  weight: number | null; // kg
  reps: number | null;
  duration: number | null; // seconds
  distance: number | null; // kilometers
  rpe: number | null; // 1-10
}

/**
 * Описание комментария или заметки
 */
export interface ParsedComment {
  text: string;
}

/**
 * Описание распознанного упражнения
 */
export interface ParsedExercise {
  originalName: string; // То, как назвал пользователь
  mappedExerciseId: string | null; // ID из БД (опционально, если не распознано или нет базы в промпте)
  isAmbiguous: boolean; // Требует уточнения
  sets: ParsedSet[];
  comments: ParsedComment[];
}

/**
 * Структура распознанной тренировки
 */
export interface ParsedWorkout {
  date: string; // YYYY-MM-DD
  focus:
    | 'legs'
    | 'glutes'
    | 'back'
    | 'chest'
    | 'shoulders'
    | 'arms'
    | 'core'
    | 'fullbody'
    | 'cardio'
    | 'mixed';
  exercises: ParsedExercise[];
  generalComments: ParsedComment[];
}
