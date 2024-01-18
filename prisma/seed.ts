import { PrismaClient } from "@prisma/client";
import { hash } from "bcrypt";
const prisma = new PrismaClient();
async function main() {
  const admin = await prisma.user.create({
    data: {
      email: "admin@example.com",
      firstname: "Admin",
      lastname: "Admin",
      password: await hash("admin", 10),
      role: "ADMIN"
    }
  });

  console.log({admin});
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
