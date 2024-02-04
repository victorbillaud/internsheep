import { UsersTable } from "@/components/user/UsersTable";
import { authOptions } from "@/lib/auth";
import { listUsers } from "@/lib/user/services";
import { getServerSession } from "next-auth";

export default async function UsersPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    throw new Error("Unauthorized");
  }

  const users = await listUsers(session);

  return (
    <div className="w-full flex flex-col space-y-5 justify-center items-center">
      <UsersTable users={users} />
    </div>
  );
}
