/*
  Warnings:

  - The `remuneration` column on the `Internship` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Internship" ALTER COLUMN "companyName" DROP NOT NULL,
ALTER COLUMN "startDate" DROP NOT NULL,
ALTER COLUMN "endDate" DROP NOT NULL,
ALTER COLUMN "mission" DROP NOT NULL,
ALTER COLUMN "numberWeeks" DROP NOT NULL,
DROP COLUMN "remuneration",
ADD COLUMN     "remuneration" INTEGER,
ALTER COLUMN "rythm" DROP NOT NULL;
