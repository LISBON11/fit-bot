-- DropIndex
DROP INDEX "idx_exercise_synonyms_text";

-- AlterTable
ALTER TABLE "workouts" ADD COLUMN     "comment" TEXT;

-- CreateIndex
CREATE INDEX "idx_exercise_synonyms_text" ON "exercise_synonyms"("synonym" text_pattern_ops);
