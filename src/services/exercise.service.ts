import type { ExerciseRepository } from '../repositories/exercise.repository.js';
import type { ResolveResult, ExerciseForNlu } from './exercise.types.js';

export class ExerciseService {
  constructor(private readonly exerciseRepository: ExerciseRepository) {}

  /**
   * Разрешает название упражнения во внутреннее представление (Exercise).
   * Алгоритм:
   * 1. Ищем в user_mapping (точные совпадения пользователя)
   * 2. Ищем в синонимах (сначала user-specific, потом глобальные)
   * 3. Если найдено ровно одно упражнение - возвращаем resolved.
   * 4. Если несколько - возвращаем ambiguous с вариантами.
   * 5. Если ничего - not_found.
   *
   * @param inputText Введенное пользователем название
   * @param userId ID пользователя
   */
  async resolveExercise(inputText: string, userId: string): Promise<ResolveResult> {
    // 1. Поиск в user_mapping
    const mapping = await this.exerciseRepository.findUserMapping(userId, inputText);
    if (mapping) {
      return { status: 'resolved', exercise: mapping.exercise };
    }

    // 2. Поиск в синонимах (user + global)
    const synonyms = await this.exerciseRepository.findSynonyms(inputText, userId);

    if (synonyms.length === 0) {
      return { status: 'not_found' };
    }

    // Приоритизация: если есть user-specific синонимы, берем их
    const userSynonyms = synonyms.filter((s) => s.userId === userId);
    const relevantSynonyms = userSynonyms.length > 0 ? userSynonyms : synonyms;

    // Убираем дубликаты упражнений на случай, если разные синонимы указывают на одно упражнение
    const uniqueExercisesMap = new Map();
    for (const syn of relevantSynonyms) {
      uniqueExercisesMap.set(syn.exercise.id, syn.exercise);
    }
    const exercises = Array.from(uniqueExercisesMap.values());

    if (exercises.length === 1) {
      return { status: 'resolved', exercise: exercises[0] };
    }

    // Здесь может быть ситуация, когда несколько упражнений найдено (ambiguous)
    return { status: 'ambiguous', options: exercises };
  }

  /**
   * Сохраняет выбор пользователя после уточнения (disambiguation)
   * @param userId ID пользователя
   * @param inputText Введенный пользователем текст
   * @param exerciseId ID выбранного упражнения
   */
  async confirmMapping(userId: string, inputText: string, exerciseId: string): Promise<void> {
    await this.exerciseRepository.upsertUserMapping(userId, inputText, exerciseId);
  }

  /**
   * Возвращает список упражнений для NLU промпта
   */
  async getExerciseListForNlu(): Promise<ExerciseForNlu[]> {
    const exercises = await this.exerciseRepository.getAll();
    return exercises.map((ex) => ({
      canonicalName: ex.canonicalName,
      displayNameRu: ex.displayNameRu,
    }));
  }
}
