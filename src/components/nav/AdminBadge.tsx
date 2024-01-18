"use client";

import { useSession } from "next-auth/react";
import { Badge } from "../ui/badge";

export const AdminBadge = () => {
  const session = useSession();

  return session.data?.user.role === "ADMIN" ? <Badge variant="destructive">Admin</Badge> : null;
};
