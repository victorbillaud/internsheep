import InternshipsTable from "@/components/internship/InternshipsTable";
import { listInternships } from "@/lib/internships/services";

export default async function InternshipsPage() {
  const internships = await listInternships();

  return <InternshipsTable internships={internships} />;
}
