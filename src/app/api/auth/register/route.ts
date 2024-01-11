import prisma from "@/lib/prisma";
import { hash } from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const {email, password} = await req.json();
  const exists = await prisma.user.findUnique({
    where: {
      email
    }
  });

  console.log(exists);

  if (exists) {
    return NextResponse.json({error: "User already exists"}, {status: 400});
  } else {
    const user = await prisma.user.create({
      data: {
        email,
        password: await hash(password, 10)
      }
    });
    return NextResponse.json(user);
  }
}
