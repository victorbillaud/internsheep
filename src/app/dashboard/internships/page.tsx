import { getInternships } from "./action";

import InternshipsTable from "@/components/internship/InternshipsTable";

export default async function InternshipsPage() {
  const internships = await getInternships();

  return <InternshipsTable internships={internships} />;
}
