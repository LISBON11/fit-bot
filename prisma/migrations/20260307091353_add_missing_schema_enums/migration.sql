-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "MovementPattern" ADD VALUE 'SQUAT';
ALTER TYPE "MovementPattern" ADD VALUE 'HINGE';
ALTER TYPE "MovementPattern" ADD VALUE 'LUNGE';
ALTER TYPE "MovementPattern" ADD VALUE 'CARRY';
ALTER TYPE "MovementPattern" ADD VALUE 'ISOLATION';

-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "Muscle" ADD VALUE 'BACK';
ALTER TYPE "Muscle" ADD VALUE 'LEGS';

-- DropIndex
DROP INDEX "idx_exercise_synonyms_text";

-- CreateIndex
CREATE INDEX "idx_exercise_synonyms_text" ON "exercise_synonyms"("synonym" text_pattern_ops);
