import { Prisma } from "@prisma/client";
import { hash } from "bcrypt";
import { Session } from "next-auth";
import prisma from "../prisma";

export async function listUsers(session: Session) {
  try {
    if (session.user?.role !== "ADMIN") {
      throw new Error("You are not authorized to perform this action");
    }
    return await prisma.user.findMany();
  } catch (error) {
    throw new Error("Error while fetching users");
  }
}

export async function createUser(session: Session, data: Prisma.UserCreateInput) {
  try {
    if (session.user?.role !== "ADMIN") {
      throw new Error("You are not authorized to perform this action");
    }

    if (!data?.password) {
      throw new Error("Password is required");
    }

    const hashedPassword = await hash(data?.password, 10);

    return prisma.user.create({
      data: {
        firstname: data?.firstname,
        lastname: data?.lastname,
        email: data?.email,
        password: hashedPassword,
        role: data?.role
      }
    });
  } catch (error) {
    throw new Error(`Error while creating user`);
  }
}
