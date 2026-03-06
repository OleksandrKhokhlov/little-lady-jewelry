"use client";

import { getToken } from "@/app/api";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function WithAdminAuth({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [isChecking, setIsChecking] = useState<boolean | null>(true);

  const ADMIN_LOGIN = "/admin/login";
  const ADMIN_PRODUCTS = "/admin/products";

  useEffect(() => {
    const token = getToken();
    const isLoginPage = pathname === ADMIN_LOGIN;
    const isAdminPage = pathname.startsWith("/admin");

    if (!token && isAdminPage && !isLoginPage) {
      router.replace(ADMIN_LOGIN);
      return;
    }
    if (token && isLoginPage) {
      router.replace(ADMIN_PRODUCTS);
      return;
    }
    setIsChecking(false);
  }, [router, pathname]);

  if (isChecking) {
    return null;
  }

  return <>{children}</>;
}
