-- DropForeignKey
ALTER TABLE "workout_comments" DROP CONSTRAINT "workout_comments_workout_exercise_id_fkey";

-- DropIndex
DROP INDEX "idx_exercise_synonyms_text";

-- CreateIndex
CREATE INDEX "idx_exercise_synonyms_text" ON "exercise_synonyms"("synonym" text_pattern_ops);

-- AddForeignKey
ALTER TABLE "workout_comments" ADD CONSTRAINT "workout_comments_workout_exercise_id_fkey" FOREIGN KEY ("workout_exercise_id") REFERENCES "workout_exercises"("id") ON DELETE CASCADE ON UPDATE CASCADE;
