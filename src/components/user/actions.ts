"use server";

import prisma from "@/lib/prisma";
import { Prisma, Role, User } from "@prisma/client";
import { revalidatePath } from "next/cache";
import * as z from "zod";

export async function createUser(
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

  try {
    const response = await prisma.user.create({
      data: {
        firstname: validatedFields.data.firstName,
        lastname: validatedFields.data.lastName,
        email: validatedFields.data.email,
        password: validatedFields.data.password,
        role: validatedFields.data.role as Role
      }
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
