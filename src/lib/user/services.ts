import { Prisma, PrismaClient } from "@prisma/client";
import { Session } from "next-auth";

export async function listUsers(prisma: PrismaClient, session: Session) {
  try {
    if (session.user?.role !== "ADMIN") {
      throw new Error("You are not authorized to perform this action");
    }
    return await prisma.user.findMany();
  } catch (error) {
    throw new Error("Error while fetching users");
  }
}

export async function createUser(
  prisma: PrismaClient,
  session: Session,
  data: Prisma.Args<typeof prisma.user, "create">["data"]
) {
  try {
    if (session.user?.role !== "ADMIN") {
      throw new Error("You are not authorized to perform this action");
    }
    const response = await prisma.user.create({
      data: {
        firstname: data?.firstname,
        lastname: data?.lastname,
        email: data?.email,
        password: data?.password,
        role: data?.role
      }
    });
    return response;
  } catch (error) {
    throw new Error(`Error while creating user: ${JSON.stringify(error)}`);
  }
}
