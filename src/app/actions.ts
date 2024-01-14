"use server";

import {PrismaClient} from "@prisma/client";
const prisma = new PrismaClient();

export const sendForm = async (formData: any) => {
  console.log("_______________________formData________________________", formData);

  try {
    const result = await prisma.internship.create({
      data: formData
    });
    console.log("Internship created:", result);
    return result;
  } catch (error) {
    console.error("Error creating internship:", error);
    throw error;
  }
};


