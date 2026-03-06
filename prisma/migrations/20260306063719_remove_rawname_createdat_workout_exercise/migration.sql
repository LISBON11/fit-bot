/*
  Warnings:

  - You are about to drop the column `created_at` on the `workout_exercises` table. All the data in the column will be lost.
  - You are about to drop the column `raw_name` on the `workout_exercises` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "idx_exercise_synonyms_text";

-- AlterTable
ALTER TABLE "workout_exercises" DROP COLUMN "created_at",
DROP COLUMN "raw_name";

-- CreateIndex
CREATE INDEX "idx_exercise_synonyms_text" ON "exercise_synonyms"("synonym" text_pattern_ops);
