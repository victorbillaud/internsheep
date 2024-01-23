import SignOut from "@/components/SignOut";
import { Button } from "@/components/ui/button";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

export default async function Home() {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  console.log(user);

  return (
    <div className="flex h-full">
      <SignOut />
      <Button>Test</Button>
    </div>
  );
}
