import { cn } from "@/lib/utils";
import { Session } from "next-auth";
import Link from "next/link";
import { Badge } from "../ui/badge";
import SignOut from "@/components/SignOut";

export interface NavItem {
  title: string;
  href?: string;
  disabled?: boolean;
  external?: boolean;
  label?: string;
  adminOnly?: boolean;
}

export interface NavItemWithChildren extends NavItem {
  items: NavItemWithChildren[];
}

export interface MainNavItem extends NavItem {}

export interface SidebarNavItem extends NavItemWithChildren {}

interface MainNavProps {
  items?: NavItem[];
  session: Session | null;
}

export function DashboardNav({items, session}: MainNavProps) {
  const isAdmin = session?.user?.role === "ADMIN";

  return (
    <div className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between py-4 bg-white backdrop-blur-md lg:px-56 md:px-36 sm:px-24 px-10 shadow-sm">
      <Link href="/dashboard" className="flex items-center space-x-2">
        <span className="inline-block font-bold">{"Internship"} </span>
        {isAdmin && <Badge variant="destructive">Admin</Badge>}
      </Link>
      {items?.length ? (
        <nav className="flex gap-6">
          {items
            .filter((item) => !item.adminOnly || isAdmin)
            .map(
              (item, index) =>
                item.href && (
                  <Link
                    key={index}
                    href={item.href}
                    className={cn(
                      "flex items-center text-sm font-medium text-muted-foreground",
                      item.disabled && "cursor-not-allowed opacity-80"
                    )}
                  >
                    {item.title}
                  </Link>
                )
            )}
            { <SignOut /> }
        </nav>
      ) : null}
    </div>
  );
}
