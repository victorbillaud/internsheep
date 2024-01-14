/*
  Warnings:

  - You are about to drop the column `description` on the `Internship` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Internship` table. All the data in the column will be lost.
  - Added the required column `mission` to the `Internship` table without a default value. This is not possible if the table is not empty.
  - Added the required column `numberWeeks` to the `Internship` table without a default value. This is not possible if the table is not empty.
  - Added the required column `remuneration` to the `Internship` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rythm` to the `Internship` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `Internship` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Internship" DROP COLUMN "description",
DROP COLUMN "name",
ADD COLUMN     "mission" TEXT NOT NULL,
ADD COLUMN     "numberWeeks" INTEGER NOT NULL,
ADD COLUMN     "remuneration" TEXT NOT NULL,
ADD COLUMN     "rythm" TEXT NOT NULL,
ADD COLUMN     "status" TEXT NOT NULL,
ALTER COLUMN "startDate" SET DATA TYPE TEXT,
ALTER COLUMN "endDate" SET DATA TYPE TEXT;
