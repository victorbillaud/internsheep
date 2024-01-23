import { UsersTable } from "@/components/user/UsersTable";
import prisma from "@/lib/prisma";

export default async function UsersPage() {
  const users = await prisma.user.findMany();

  return (
    <div className="w-full flex flex-col space-y-5 justify-center items-center">
      <UsersTable users={users} />
    </div>
  );
}
