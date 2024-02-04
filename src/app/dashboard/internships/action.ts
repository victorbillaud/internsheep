"use server";

import prisma from "@/lib/prisma";

export async function getInternships() {
  return prisma.internship.findMany({include: {documents: true}});
}

export async function getInternship(id: number) {
  return prisma.internship.findUnique({
    where: {id}
  });
}
