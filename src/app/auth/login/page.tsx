import { LoginForm } from "@/components/form/LoginForm";
import Link from "next/link";

export default function Page() {
  return (
    <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Create an account
              </h1>
              <p className="text-sm text-muted-foreground">
                Enter your email below to create your account
              </p>
            </div>
            <LoginForm />
            <p className="text-sm">
              Don't have an account ? <Link href="/auth/register" className="font-bold">Register</Link>
            </p>
          </div>
        </div>
  );
}
