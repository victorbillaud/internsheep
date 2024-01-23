import SignOut from "@/components/SignOut";
import { Button } from "@/components/ui/button";
import { getServerSession } from "next-auth";

export default async function Home() {
  const session = await getServerSession();

  console.log(session);

  return (
    <div className="flex h-full">
      <SignOut />
      <Button>Test</Button>
    </div>
  );
}
