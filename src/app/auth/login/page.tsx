import { LoginForm } from "@/componentsV2/form/LoginForm";

export default function Page() {
  return (
    <div className="lg:p-8">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">Login into your account</h1>
          <p className="text-sm text-muted-foreground">
            Enter your email below to continue to your account
          </p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
