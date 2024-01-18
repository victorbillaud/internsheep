/*
  Warnings:

  - Added the required column `firstname` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastname` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'STUDENT', 'TUTOR');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "firstname" TEXT NOT NULL,
ADD COLUMN     "lastname" TEXT NOT NULL,
ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'ADMIN';
