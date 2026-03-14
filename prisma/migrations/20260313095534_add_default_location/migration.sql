-- DropIndex
DROP INDEX "idx_exercise_synonyms_text";

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "default_location" TEXT;

-- CreateIndex
CREATE INDEX "idx_exercise_synonyms_text" ON "exercise_synonyms"("synonym" text_pattern_ops);
