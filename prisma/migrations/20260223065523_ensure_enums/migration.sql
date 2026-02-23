/*
  Warnings:

  - The `unit` column on the `exercise_sets` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `category` column on the `exercises` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `side` column on the `workout_comments` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `sensation_type` column on the `workout_comments` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `status` column on the `workouts` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `comment_type` on the `workout_comments` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "WorkoutStatus" AS ENUM ('DRAFT', 'APPROVED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "ExerciseCategory" AS ENUM ('COMPOUND', 'ISOLATION', 'CARDIO');

-- CreateEnum
CREATE TYPE "WeightUnit" AS ENUM ('KG', 'LB');

-- CreateEnum
CREATE TYPE "CommentType" AS ENUM ('TECHNIQUE', 'SENSATION', 'ASYMMETRY', 'OTHER');

-- CreateEnum
CREATE TYPE "BodySide" AS ENUM ('LEFT', 'RIGHT', 'BOTH');

-- CreateEnum
CREATE TYPE "SensationType" AS ENUM ('PAIN', 'TENSION', 'BURN');

-- DropIndex
DROP INDEX "idx_exercise_synonyms_text";

-- DropIndex
DROP INDEX "users_telegram_id_key";

-- AlterTable
ALTER TABLE "exercise_sets" DROP COLUMN "unit",
ADD COLUMN     "unit" "WeightUnit" NOT NULL DEFAULT 'KG';

-- AlterTable
ALTER TABLE "exercises" DROP COLUMN "category",
ADD COLUMN     "category" "ExerciseCategory";

-- AlterTable
ALTER TABLE "workout_comments" DROP COLUMN "comment_type",
ADD COLUMN     "comment_type" "CommentType" NOT NULL,
DROP COLUMN "side",
ADD COLUMN     "side" "BodySide",
DROP COLUMN "sensation_type",
ADD COLUMN     "sensation_type" "SensationType";

-- AlterTable
ALTER TABLE "workouts" DROP COLUMN "status",
ADD COLUMN     "status" "WorkoutStatus" NOT NULL DEFAULT 'DRAFT';

-- CreateIndex
CREATE INDEX "idx_exercise_synonyms_text" ON "exercise_synonyms"("synonym" text_pattern_ops);

-- CreateIndex
CREATE INDEX "idx_workout_exercises_workout" ON "workout_exercises"("workout_id");
