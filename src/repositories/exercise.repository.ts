import type {
  PrismaClient,
  Exercise,
  Prisma,
  UserExerciseMapping,
  ExerciseSynonym,
} from '@prisma/client';

/**
 * Репозиторий для управления упражнениями, синонимами и пользовательскими маппингами
 */
export class ExerciseRepository {
  constructor(private readonly prisma: PrismaClient) {}

  /**
   * Находит все синонимы по заданному тексту, учитывая пользовательские и глобальные
   * @param text Текст для поиска
   * @param userId ID пользователя для поиска специфичных синонимов
   * @returns Список найденных синонимов вместе с упражнениями
   */
  async findSynonyms(
    text: string,
    userId?: string,
  ): Promise<(ExerciseSynonym & { exercise: Exercise })[]> {
    const lowerText = text.toLowerCase();

    // В PostgreSQL мы можем использовать mode: 'insensitive' для регистронезависимого поиска
    const whereClause: Prisma.ExerciseSynonymWhereInput = {
      AND: [
        { synonym: { equals: lowerText, mode: 'insensitive' } },
        {
          OR: [...(userId ? [{ userId }] : []), { isGlobal: true }],
        },
      ],
    };

    return this.prisma.exerciseSynonym.findMany({
      where: whereClause,
      include: {
        exercise: true,
      },
    });
  }

  /**
   * Находит маппинг пользователя для введенного текста
   * @param userId ID пользователя
   * @param inputText Введенный текст
   */
  async findUserMapping(
    userId: string,
    inputText: string,
  ): Promise<(UserExerciseMapping & { exercise: Exercise }) | null> {
    const lowerText = inputText.toLowerCase();

    return this.prisma.userExerciseMapping.findFirst({
      where: {
        userId,
        inputText: lowerText,
      },
      include: {
        exercise: true,
      },
    });
  }

  /**
   * Создает или обновляет счетчик маппинга пользователя
   * @param userId ID пользователя
   * @param inputText Введенный текст
   * @param exerciseId ID упражнения
   */
  async upsertUserMapping(
    userId: string,
    inputText: string,
    exerciseId: string,
  ): Promise<UserExerciseMapping> {
    const lowerText = inputText.toLowerCase();

    const existing = await this.prisma.userExerciseMapping.findFirst({
      where: { userId, inputText: lowerText, exerciseId },
    });

    if (existing) {
      return this.prisma.userExerciseMapping.update({
        where: { id: existing.id },
        data: { useCount: { increment: 1 } },
      });
    }

    return this.prisma.userExerciseMapping.create({
      data: {
        userId,
        inputText: lowerText,
        exerciseId,
        useCount: 1,
      },
    });
  }

  /**
   * Возвращает все глобальные упражнения
   */
  async getAll(): Promise<Exercise[]> {
    return this.prisma.exercise.findMany({
      where: { isGlobal: true },
    });
  }

  /**
   * Возвращает упражнение по ID
   * @param id ID упражнения
   */
  async findById(id: string): Promise<Exercise | null> {
    return this.prisma.exercise.findUnique({
      where: { id },
    });
  }

  /**
   * Создает новое упражнение
   * @param data Данные для создания
   */
  async create(data: Omit<Exercise, 'id' | 'createdAt'>): Promise<Exercise> {
    return this.prisma.exercise.create({
      data,
    });
  }

  /**
   * Находит похожие упражнения по заданному запросу.
   * Разбивает запрос на слова и ищет частичные совпадения в названиях и синонимах.
   * Если слов нет, возвращает несколько глобальных упражнений.
   * @param query Поисковый запрос
   * @param limit Ограничение количества результатов (по умолчанию 5)
   */
  async searchSimilar(query: string, limit: number = 5): Promise<Exercise[]> {
    const words = query
      .toLowerCase()
      .split(/\s+/)
      .filter((w) => w.length > 2);

    if (words.length === 0) {
      // Fallback: просто вернем несколько популярных/глобальных упражнений
      return this.prisma.exercise.findMany({
        where: { isGlobal: true },
        take: limit,
      });
    }

    const orConditions: Prisma.ExerciseWhereInput[] = words.map((word) => ({
      OR: [
        { canonicalName: { contains: word, mode: 'insensitive' } },
        { displayNameRu: { contains: word, mode: 'insensitive' } },
        { displayNameEn: { contains: word, mode: 'insensitive' } },
        {
          synonyms: {
            some: {
              synonym: { contains: word, mode: 'insensitive' },
            },
          },
        },
      ],
    }));

    // Ищем упражнения, где хотя бы одно слово совпадает
    return this.prisma.exercise.findMany({
      where: {
        OR: orConditions,
      },
      take: limit,
    });
  }
}
