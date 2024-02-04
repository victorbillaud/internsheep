import InternshipsTable from "@/components/internship/InternshipsTable";
import { authOptions } from "@/lib/auth";
import { listInternships } from "@/lib/internships/services";
import { getServerSession } from "next-auth";

export default async function InternshipsPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    throw new Error("Unauthorized");
  }

  const internships = await listInternships(session);

  return <InternshipsTable internships={internships} />;
}
