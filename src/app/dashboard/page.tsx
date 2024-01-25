import SignOut from "@/components/SignOut";
import { Button } from "@/components/ui/button";

export default async function Home() {
  return (
    <div className="flex h-full">
      <SignOut />
      <Button>Test</Button>
    </div>
  );
}
