"use client";
import { signOut, useSession } from "next-auth/react";

export default function SignOut() {

  const session = useSession()

  return (
    <div className="flex flex-col space-y-5 justify-center items-center">
      <button
        className="text-red-400 hover:text-stone-200 transition-all"
        onClick={() => signOut()}
      >
        Sign out
      </button>
    
      {/* <div className="text-white text-lg">
        {session.data?.user?.email}
      </div> */}
    </div>
  );
}
