import { DashboardNav } from "@/components/nav/DashboardNav";

export default async function DashboardLayout({children}: {children: React.ReactNode}) {
  return (
    <div className="w-screen h-screen flex flex-col">
      <DashboardNav
        items={[
          {title: "Home", href: "/dashboard"},
          {title: "Users", href: "/dashboard/users", adminOnly: true},
          {title: "Internships", href: "/dashboard/internships"}
        ]}
      />
      <div className="w-full flex flex-col space-y-5 justify-center items-center mt-20 lg:px-56 md:px-36 sm:px-24 px-10">
        {children}
      </div>
    </div>
  );
}
