import { PrismaClient } from "@prisma/client";
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
