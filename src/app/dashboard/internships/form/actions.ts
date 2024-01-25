"use server";

import { authOptions } from "@/lib/auth";
import { createInternship } from "@/lib/internships/services";
import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export async function sendForm(
  internshipData: Omit<Prisma.Args<typeof prisma.internship, "create">["data"], "user">
) {
  try {
    const session = await getServerSession(authOptions);
    const user = session?.user;
    await createInternship(internshipData, user?.id as string);
    redirect("/dashboard/internships");
  } catch (error) {
    console.error(error);
    redirect(`/dashboard/internships/form?error=${error}`);
  }
}
