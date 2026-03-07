# Хотелки (HOTELKI)

- Убрать все `*MessageId` (например, `sourceMessageId`, `previewMessageId`, `publishedMessageId`), а также `createdAt` и `updatedAt` из таблицы `Workout` в БД `prisma/schema.prisma` после того, как будет настроено полноценное логирование (например, через pino / Sentry / Datadog). Эти поля нужны только для отладки UI и метрик создания, и после настройки нормального логирования их можно вынести из сущности тренировки для "чистоты домена".
- Написать скрипт/cron-джобу для периодического анализа таблицы `UserExerciseMapping`. Нужно смотреть самые часто используемые (`useCount`) фразы/опечатки и рассматривать возможность добавления их в `ExerciseSynonym` как официальные эталонные глобальные синонимы.
- Почеленджить Hevy / Strong / Fitbod
- **Поиск синонимов и эквипмент**: Синонимы нужно искать по названию целевого упражнения. У целевого упражнения есть дефолт для эквипмента, но можно указать и другое (например, штанга, гантели?).
- **Взаимозаменяемые упражнения**: Хорошо бы как-то в базе пролинковать упражнения, которые взаимозаменяемые.
  - Пример иерархии:
    - Bench Press
      ├ Dumbbell Bench Press
      ├ Barbell Bench Press
      ├ Smith Machine Bench Press
  - Можно создать отдельную таблицу `ExerciseSubstitution`:
    - `exercise_id`
    - `substitute_exercise_id`
    - `score`
  - Пример записи `ExerciseSubstitution`:
    ```json
    {
      "exercise_id": "barbell_bench_press",
      "substitute_exercise_id": "dumbbell_bench_press",
      "score": 0.95
    }
    ```
  - Что означает `score`:
    - `1.0` — почти идентичное упражнение
    - `0.8` — очень похожее
    - `0.6` — допустимая замена
    - `0.3` — крайний вариант
  - Как рассчитывается similarity (обычно по этим параметрам):
    - primary muscle
    - movement pattern
    - equipment
    - compound/isolation
