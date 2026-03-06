/*
  Warnings:

  - You are about to drop the column `is_global` on the `exercise_synonyms` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `exercise_synonyms` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "exercise_synonyms" DROP CONSTRAINT "exercise_synonyms_user_id_fkey";

-- DropIndex
DROP INDEX "idx_exercise_synonyms_text";

-- DropIndex
DROP INDEX "idx_exercise_synonyms_user";

-- AlterTable
ALTER TABLE "exercise_synonyms" DROP COLUMN "is_global",
DROP COLUMN "user_id";

-- CreateIndex
CREATE INDEX "idx_exercise_synonyms_text" ON "exercise_synonyms"("synonym" text_pattern_ops);
