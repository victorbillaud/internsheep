import { PrismaClient } from "@prisma/client";
import { hash } from "bcrypt";
const prisma = new PrismaClient();
async function main() {
  await prisma.user.create({
    data: {
      email: "admin@example.com",
      firstname: "Admin",
      lastname: "Admin",
      password: await hash("admin", 10),
      role: "ADMIN"
    }
  });

  const student = await prisma.user.create({
    data: {
      email: "student@example.com",
      firstname: "Student",
      lastname: "Student",
      password: await hash("student", 10),
      role: "STUDENT"
    }
  });

  await prisma.user.create({
    data: {
      email: "tutor@example.com",
      firstname: "Tutor",
      lastname: "Tutor",
      password: await hash("tutor", 10),
      role: "TUTOR"
    }
  });

  await prisma.internship.create({
    data: {
      companyName: "Company 1",
      mission: "Mission of internship 1",
      startDate: new Date("2021-01-01").toISOString(),
      endDate: new Date("2021-02-01").toISOString(),
      rythm: "full-time",
      numberWeeks: 4,
      remuneration: 1000,
      user: {
        connect: {
          id: student.id
        }
      }
    }
  });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
