/*
  Warnings:

  - You are about to drop the column `muscle_groups` on the `exercises` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "idx_exercise_synonyms_text";

-- AlterTable
ALTER TABLE "exercises" DROP COLUMN "muscle_groups",
ADD COLUMN     "primary_muscle" TEXT NOT NULL DEFAULT 'unknown',
ADD COLUMN     "secondary_muscles" TEXT[] DEFAULT ARRAY[]::TEXT[];

-- CreateIndex
CREATE INDEX "idx_exercise_synonyms_text" ON "exercise_synonyms"("synonym" text_pattern_ops);
