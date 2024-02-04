"use client";
import { LogOutIcon } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { Button } from "./ui/button";

export default function SignOut() {

  const session = useSession()

  return (
    <div className="flex flex-col space-y-5 justify-center items-center">
      <Button
        variant={"destructive"}
        size={"icon"}
        onClick={() => signOut()}
      >
        <LogOutIcon color="white" size={18} />
      </Button>
    </div>
  );
}
