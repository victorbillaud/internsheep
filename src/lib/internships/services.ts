import { Prisma } from "@prisma/client";
import { Session } from "next-auth";
import prisma from "../prisma";

export async function listInternships(session: Session) {
  try {
    const userRole = session.user?.role;

    switch (userRole) {
      case "ADMIN":
        return await prisma.internship.findMany();
      case "TUTOR":
        // TODO: filter internships by tutor
        return await prisma.internship.findMany();
      case "STUDENT":
        return await prisma.internship.findMany({
          where: {
            user: {
              id: session.user?.id
            }
          }
        });
      default:
        throw new Error("You are not authorized to perform this action");
    }
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
  data: Omit<Prisma.InternshipCreateInput, "user">,
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
    console.log(error);
    throw new Error(`Error while creating internship with data ${JSON.stringify(data)}`);
  }
}
