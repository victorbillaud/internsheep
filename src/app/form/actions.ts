"use server";

import {PrismaClient} from "@prisma/client";
import {redirect} from "next/navigation";
const prisma = new PrismaClient();

class CustomError extends Error {
  code: string;

  constructor(msg: string, code: string) {
    super(msg);
    this.code = code;
  }
}

export async function sendForm() {
  console.log("_______________________formData________________________", formData);

  // Validation du formulaire côté serveur
  if (
    !formData.companyName ||
    !formData.mission ||
    !formData.rythm ||
    formData.numberWeeks <= 0 ||
    formData.remuneration <= 0 ||
    !formData.startDate ||
    !formData.endDate
  ) {
    console.log("Formulaire invalide");
    redirect("/form?error=invalidForm");
  }

  try {
    const result = await prisma.internship.create({
      data: formData
    });
    console.log("Internship created:", result);
  } catch (error) {
    console.error("Error creating internship:", error);
    redirect("/form?error=creatinIntership");
  }
}
