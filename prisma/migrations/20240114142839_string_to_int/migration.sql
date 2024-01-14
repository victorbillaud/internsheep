-- Drop the existing table if it exists
DROP TABLE IF EXISTS "Internship";

-- Create the new table
CREATE TABLE "Internship" (
    "id" SERIAL NOT NULL,
    "companyName" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "mission" TEXT NOT NULL,
    "numberWeeks" INTEGER NOT NULL,
    "remuneration" TEXT NOT NULL,
    "rythm" TEXT NOT NULL,
    
    CONSTRAINT "Internship_pkey" PRIMARY KEY ("id")
);

