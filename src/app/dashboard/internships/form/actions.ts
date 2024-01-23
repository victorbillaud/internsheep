"use server";

import { authOptions } from "@/lib/auth";
import { Prisma, PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
const prisma = new PrismaClient();

type InternshipCreateBody = Prisma.Args<typeof prisma.internship, "create">["data"];

export async function sendForm(internshipData: Omit<InternshipCreateBody, "user">) {
  try {
    const session = await getServerSession(authOptions);
    const user = session?.user;

    const result = await prisma.internship.create({
      data: {
        ...internshipData,
        user: {
          connect: {
            id: user?.id as string
          }
        }
      }
    });
    console.log("Internship created:", result);
  } catch (error) {
    console.error("Error creating internship:", error);
    redirect("/dashboard/internships/form?error=Error creating internship");
  }

  redirect("/dashboard/internships");
}
