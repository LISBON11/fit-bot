import type { ExerciseRepository } from '../repositories/exercise.repository.js';
import type { ResolveResult, ExerciseForNlu } from './exercise.types.js';
import type { Exercise } from '../generated/prisma/index.js';

/**
 * Сервис для бизнес-логики, связанной с поиском и разрешением названий упражнений
 */
export class ExerciseService {
  constructor(private readonly exerciseRepository: ExerciseRepository) {}

  /**
   * Разрешает название упражнения во внутреннее представление (Exercise).
   * Алгоритм:
   * 1. Ищем в user_mapping (точный маппинг пользователя)
   * 2. Ищем в синонимах (глобальная таблица)
   * 3. Ищем по точному совпадению с canonicalName / displayNameRu (NLU могла вернуть правильное название, но не проставить ID)
   * 4. Fuzzy-поиск (searchSimilar) — возвращает ambiguous с вариантами
   * 5. Если ничего не найдено — not_found
   *
   * @param inputText Введенное пользователем название
   * @param userId ID пользователя
   * @returns Результат разрешения названия (успех, неоднозначность или не найдено)
   */
  async resolveExercise({
    inputText,
    userId,
  }: {
    inputText: string;
    userId: string;
  }): Promise<ResolveResult> {
    // 1. Поиск в user_mapping
    const mapping = await this.exerciseRepository.findUserMapping({ userId, inputText });
    if (mapping) {
      return { status: 'resolved', exercise: mapping.exercise };
    }

    // 2. Поиск в синонимах (все они теперь глобальные)
    const synonyms = await this.exerciseRepository.findSynonyms({ text: inputText });

    if (synonyms.length > 0) {
      const uniqueExercisesMap = new Map();
      for (const syn of synonyms) {
        uniqueExercisesMap.set(syn.exercise.id, syn.exercise);
      }
      const exercises = Array.from(uniqueExercisesMap.values());

      if (exercises.length === 1) {
        return { status: 'resolved', exercise: exercises[0] };
      }
      return { status: 'ambiguous', options: exercises };
    }

    // 3. Детерминированный fallback: ищем по точному имени упражнения.
    // NLU могла вернуть правильное название (например, «Жим лёжа»), но «забыть» проставить mappedExerciseId.
    const byName = await this.exerciseRepository.findByExactName({ name: inputText });
    if (byName.length === 1) {
      return { status: 'resolved', exercise: byName[0] };
    }
    if (byName.length > 1) {
      return { status: 'ambiguous', options: byName };
    }

    // 4. Fuzzy-поиск: если и точный поиск ничего не дал
    const similarExercises = await this.exerciseRepository.searchSimilar({
      query: inputText,
      limit: 5,
    });
    if (similarExercises.length > 0) {
      return { status: 'ambiguous', options: similarExercises };
    }
    return { status: 'not_found' };
  }

  /**
   * Сохраняет выбор пользователя после уточнения (disambiguation)
   * @param userId ID пользователя
   * @param inputText Введенный пользователем текст
   * @param exerciseId ID выбранного упражнения
   */
  async confirmMapping({
    userId,
    inputText,
    exerciseId,
  }: {
    userId: string;
    inputText: string;
    exerciseId: string;
  }): Promise<void> {
    await this.exerciseRepository.upsertUserMapping({ userId, inputText, exerciseId });
  }

  /**
   * Возвращает список упражнений для NLU-промпта.
   * Включает `id`, `aliases` — DeepSeek использует их для установки `mappedExerciseId`
   * даже при опечатках («джим» → «жим лёжа»).
   * @returns Массив объектов упражнений для передачи в контекст NLU
   */
  async getExerciseListForNlu(): Promise<ExerciseForNlu[]> {
    const exercises = await this.exerciseRepository.getAllWithSynonyms();
    return exercises.map((ex) => ({
      id: ex.id,
      canonicalName: ex.canonicalName,
      displayNameRu: ex.displayNameRu,
      aliases: ex.synonyms.map((s) => s.synonym),
    }));
  }

  /**
   * Создаёт пользовательское упражнение по имени, которое ввёл пользователь,
   * и сразу регистрирует маппинг для будущих сессий.
   * @param userId ID пользователя
   * @param name Название упражнения (так, как ввёл пользователь)
   * @returns Созданное упражнение
   */
  async createUserExercise({ userId, name }: { userId: string; name: string }): Promise<Exercise> {
    const exercise = await this.exerciseRepository.create({
      canonicalName: name.toLowerCase().trim(),
      displayNameRu: name.trim(),
      displayNameEn: null,
      isGlobal: false,
      movementPattern: null,
      equipment: null,
      primaryMuscles: [],
      secondaryMuscles: [],
      level: null,
      instructions: [],
      exerciseType: null,
      category: null,
      createdBy: userId,
    });
    // Сразу сохраняем маппинг, чтобы в следующий раз не показывал disambiguation
    await this.confirmMapping({ userId, inputText: name, exerciseId: exercise.id });
    return exercise;
  }

  /**
   * Возвращает все глобальные упражнения.
   * Используется для показа полного списка при голосовом выборе.
   * @returns Массив всех глобальных упражнений
   */
  async getAllExercises(): Promise<Exercise[]> {
    return this.exerciseRepository.getAll();
  }

  /**
   * Возвращает список уникальных групп мышц из всех глобальных упражнений.
   * Используется для первого шага голосового выбора — кнопки категорий.
   * @returns Массив строк с названиями групп мышц
   */
  async getMuscleGroups(): Promise<string[]> {
    return this.exerciseRepository.getMuscleGroups();
  }

  /**
   * Возвращает глобальные упражнения по группе мышц.
   * @param muscleGroupValues Массив английских ключей из БД (из MuscleGroupEntry.dbValues)
   * @returns Список упражнений
   */
  async getByMuscleGroup(muscleGroupValues: string[]): Promise<Exercise[]> {
    return this.exerciseRepository.getByMuscleGroup(muscleGroupValues);
  }
}
