/*
  Warnings:

  - The `secondary_muscles` column on the `exercises` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `movement_pattern` column on the `exercises` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `equipment` column on the `exercises` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `exercise_type` column on the `exercises` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `level` column on the `exercises` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `primary_muscles` column on the `exercises` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "Equipment" AS ENUM ('BARBELL', 'DUMBBELL', 'MACHINE', 'CABLE', 'BODYWEIGHT', 'KETTLEBELL', 'SMITH_MACHINE', 'RESISTANCE_BAND');

-- CreateEnum
CREATE TYPE "MovementPattern" AS ENUM ('PUSH', 'PULL', 'STATIC');

-- CreateEnum
CREATE TYPE "Muscle" AS ENUM ('ABDOMINALS', 'ABDUCTORS', 'ADDUCTORS', 'BICEPS', 'CALVES', 'CHEST', 'FOREARMS', 'GLUTES', 'HAMSTRINGS', 'LATS', 'LOWER_BACK', 'MIDDLE_BACK', 'QUADRICEPS', 'SHOULDERS', 'TRAPS', 'TRICEPS');

-- CreateEnum
CREATE TYPE "ExerciseType" AS ENUM ('STRENGTH', 'PLYOMETRICS');

-- CreateEnum
CREATE TYPE "ExperienceLevel" AS ENUM ('BEGINNER', 'INTERMEDIATE', 'EXPERT');

-- DropIndex
DROP INDEX "idx_exercise_synonyms_text";

-- AlterTable
ALTER TABLE "exercises" DROP COLUMN "secondary_muscles",
ADD COLUMN     "secondary_muscles" "Muscle"[] DEFAULT ARRAY[]::"Muscle"[],
DROP COLUMN "movement_pattern",
ADD COLUMN     "movement_pattern" "MovementPattern",
DROP COLUMN "equipment",
ADD COLUMN     "equipment" "Equipment",
DROP COLUMN "exercise_type",
ADD COLUMN     "exercise_type" "ExerciseType",
DROP COLUMN "level",
ADD COLUMN     "level" "ExperienceLevel",
DROP COLUMN "primary_muscles",
ADD COLUMN     "primary_muscles" "Muscle"[];

-- CreateIndex
CREATE INDEX "idx_exercise_synonyms_text" ON "exercise_synonyms"("synonym" text_pattern_ops);
