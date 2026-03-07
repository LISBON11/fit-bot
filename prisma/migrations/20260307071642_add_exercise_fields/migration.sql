/*
  Warnings:

  - You are about to drop the column `primary_muscle` on the `exercises` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "idx_exercise_synonyms_text";

-- AlterTable
ALTER TABLE "exercises" DROP COLUMN "primary_muscle",
ADD COLUMN     "exercise_type" TEXT,
ADD COLUMN     "instructions" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "level" TEXT,
ADD COLUMN     "primary_muscles" TEXT[];

-- CreateIndex
CREATE INDEX "idx_exercise_synonyms_text" ON "exercise_synonyms"("synonym" text_pattern_ops);
