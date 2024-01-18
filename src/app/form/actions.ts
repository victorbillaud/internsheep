"use server";

import { PrismaClient } from "@prisma/client";
import { redirect } from "next/navigation";
const prisma = new PrismaClient();

interface InternshipData {
  companyName: string;
  mission: string; 
  numberWeeks: number;
  remuneration: number;
  rythm: "full-time" | "part-time";
  startDate: string; // date au format ISO
  endDate: string; // date au format ISO
}

export async function sendForm(internshipData: InternshipData) {

  try {
    const result = await prisma.internship.create({
      data: internshipData
    });
    console.log("Internship created:", result);

  } catch (error) {
    console.error("Error creating internship:", error)
    redirect("/form?error=Error creatin intership")
  }

  redirect("/");
}
