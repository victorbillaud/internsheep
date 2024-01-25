"use server";

import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { createUser } from "@/lib/user/services";
import { Prisma, Role, User } from "@prisma/client";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import * as z from "zod";

export async function createUserAction(
  prevState: {
    message: string | null;
    user: User | null;
  },
  formData: FormData
) {
  const userCreationSchema = z.object({
    firstName: z.string().min(2),
    lastName: z.string().min(2),
    email: z.string().email(),
    password: z.string().min(8),
    role: z.enum(["ADMIN", "TUTOR", "STUDENT"])
  });

  const validatedFields = userCreationSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    role: formData.get("role")
  });

  if (!validatedFields.success) {
    return {
      message: "Invalid fields",
      user: null
    };
  }

  const session = await getServerSession(authOptions);

  if (!session) {
    throw new Error("You are not authorized to perform this action");
  }

  try {
    const response = await createUser(prisma, session, {
      firstname: validatedFields.data.firstName,
      lastname: validatedFields.data.lastName,
      email: validatedFields.data.email,
      password: validatedFields.data.password,
      role: validatedFields.data.role as Role
    });

    revalidatePath("/dashboard/users");
    return {
      user: response,
      message: null
    };
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return {
          message: "Email already exists",
          user: null
        };
      } else {
        return {
          message: "Something went wrong",
          user: null
        };
      }
    }
  }
}
