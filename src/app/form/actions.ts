// "use server";

// import { PrismaClient } from "@prisma/client";
// const prisma = new PrismaClient();

// export async function sendForm(this: any, formData: any) {
//   console.log("_______________________formData________________________", formData);

//   // Validation du formulaire côté serveur
//   if (
//     !formData.companyName ||
//     !formData.mission ||
//     !formData.rythm ||
//     formData.numberWeeks <= 0 ||
//     formData.remuneration <= 0 ||
//     !formData.startDate ||
//     !formData.endDate
//   ) {
//     console.log('yoooooooooooooooooooooooooooooooooooooo')
//     return {
//       status: 500,
//       body: JSON.stringify({
//         error: {
//           code: 'INTERNAL_ERROR',
//           message: "Le formulaire n'est pas rempli correctement. Veuillez remplir tous les champs."
//         }
//       })
//     }
//   }

//   try {
//     const result = await prisma.internship.create({
//       data: formData
//     });
//     console.log("Internship created:", result);
//     return result;
//   } catch (error) {
//     console.error("Error creating internship:", error);
//     return {
//       status: 500,
//       body: JSON.stringify({
//         error: {
//           code: '500',
//           message: 'Internal Server Error'
//         }
//       })
//     }
//   }
// }

// export async function isNotFormValid() {
//   console.log("test");
//   return false;
// }
"use server";

import { PrismaClient } from "@prisma/client";
import { redirect } from "next/navigation";
const prisma = new PrismaClient();

class CustomError extends Error {
  code: string;

  constructor(msg: string, code: string) {
    super(msg);
    this.code = code;
  }
}

export async function sendForm(formData: any) {
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
    redirect("/form?error=Formulaire invalide");
  }

  try {
    const result = await prisma.internship.create({
      data: formData
    });
    console.log("Internship created:", result);
    // return result;
  } catch (error) {
    console.error("Error creating internship:", error);
    return {message: "Internal Server Error"};
  }
}
