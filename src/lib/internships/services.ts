import { Prisma } from "@prisma/client";
import prisma from "../prisma";

export async function listInternships() {
  try {
    return await prisma.internship.findMany();
  } catch (error) {
    throw new Error("Error while fetching internships");
  }
}

export async function getInternship(id: number) {
  try {
    return await prisma.internship.findUnique({
      where: {id}
    });
  } catch (error) {
    throw new Error(`Error while fetching internship with id ${id}`);
  }
}

export async function createInternship(
  data: Omit<Prisma.Args<typeof prisma.internship, "create">["data"], "user">,
  userId: string
) {
  try {
    return await prisma.internship.create({
      // @ts-ignore
      data: {
        ...data,
        user: {
          connect: {
            id: userId as string
          }
        }
      }
    });
  } catch (error) {
    throw new Error(`Error while creating internship with data ${JSON.stringify(data)}`);
  }
}
