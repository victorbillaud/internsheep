import { DashboardNav } from "@/components/nav/DashboardNav";
import { getServerSession } from "next-auth";

export default async function DashboardLayout({children}: {children: React.ReactNode}) {
  const session = await getServerSession();

  return (
    <div className="w-screen h-screen flex flex-col">
      <DashboardNav
        items={[
          {title: "Home", href: "/dashboard"},
          {title: "Users", href: "/dashboard/users"}
        ]}
        session={session}
      />
      <div className="w-full flex flex-col space-y-5 justify-center items-center mt-20 px-40">{children}</div>
    </div>
  );
}
