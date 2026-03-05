"use client";

import WithAdminAuth from "@/components/withAdminAuth";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <WithAdminAuth>{children}</WithAdminAuth>;
}
