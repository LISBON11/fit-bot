/*
  Warnings:

  - You are about to drop the column `created_at` on the `exercise_sets` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "idx_exercise_synonyms_text";

-- AlterTable
ALTER TABLE "exercise_sets" DROP COLUMN "created_at";

-- CreateIndex
CREATE INDEX "idx_exercise_synonyms_text" ON "exercise_synonyms"("synonym" text_pattern_ops);
