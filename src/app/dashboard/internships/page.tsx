import InternshipsTable from "@/components/internship/InternshipsTable";
import { listInternships } from "@/lib/internships/services";
import { PrismaClient } from "@prisma/client";

export default async function InternshipsPage() {
  const prisma = new PrismaClient();
  const internships = await listInternships(prisma);

  return <InternshipsTable internships={internships} />;
}
