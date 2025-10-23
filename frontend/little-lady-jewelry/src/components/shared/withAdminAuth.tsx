import { getToken } from "@/app/api";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function withAdminAuth<P>(
  WrappedComponent: React.ComponentType<P>,
) {
  return function ProtectedPage(props: React.PropsWithChildren<P>) {
    const router = useRouter();
    const pathname = usePathname();
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(
      false,
    );

    useEffect(() => {
      const token = getToken();

      if (
        !token &&
        pathname.startsWith("/admin") &&
        pathname !== "/admin/login"
      ) {
        router.replace("/admin/login");
        return;
      }

      if (token && pathname === "/admin/login") {
        router.replace("/admin/products");
        return;
      }

      if (token || pathname === "/admin/login") {
        setIsAuthenticated(true);
      }
    }, [router, pathname]);

    if (!isAuthenticated) {
      return null;
    }

    return <WrappedComponent {...props} />;
  };
}
