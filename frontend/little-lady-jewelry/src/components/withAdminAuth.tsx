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

    const ADMIN_DASHBOARD_PATH = "/admin/products";
    const ADMIN_LOGIN_PATH = "/admin/login";

    useEffect(() => {
      const token = getToken();
      const onLoginPage = pathname === ADMIN_LOGIN_PATH;
      const onAdminPage = pathname.startsWith("/admin");

      if (token) {
        if (onLoginPage) {
          router.replace(ADMIN_DASHBOARD_PATH);
          return;
        }
        setIsAuthenticated(true);
      } else {
        if (onAdminPage && !onLoginPage) {
          router.replace(ADMIN_LOGIN_PATH);
          return;
        }
        setIsAuthenticated(true);
      }
    }, [router, pathname]);

    if (!isAuthenticated) {
      return null;
    }

    return <WrappedComponent {...props} />;
  };
}
