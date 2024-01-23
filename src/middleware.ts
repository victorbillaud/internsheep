import { User } from "@prisma/client";
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export interface PermissionObject {
  name: string;
  path: string[];
}

const ROLE_PERMISSIONS: Record<string, PermissionObject> = {
  ADMIN: {
    name: "Admin",
    path: [
      "/dashboard",
      "/dashboard/users",
      "/dashboard/internships",
      "/dashboard/internships/form"
    ]
  },
  STUDENT: {
    name: "Student",
    path: ["/dashboard", "/dashboard/internships", "/dashboard/internships/form"]
  },
  TUTOR: {
    name: "Tutor",
    path: ["/dashboard", "/dashboard/internships", "/dashboard/internships/form"]
  }
};

export default withAuth(
  function middleware(req) {
    const role = req.nextauth?.token?.role as User["role"];
    const path = req.nextUrl.pathname;

    if (role && ROLE_PERMISSIONS[role].path.includes(path)) {
      return NextResponse.next();
    }

    return NextResponse.redirect(new URL("/dashboard", req.nextUrl.origin).href);
  },
  {
    callbacks: {
      authorized: ({token}) => !!token
    }
  }
);

export const config = {
  matcher: [
    "/dashboard",
    "/dashboard/users",
    "/dashboard/internships",
    "/dashboard/internships/form"
  ]
};
