import { getToken } from "@/app/api";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function withAdminAuth<P>(
  WrappedComponent: React.ComponentType<P>,
) {
  return function ProtectedPage(props: React.PropsWithChildren<P>) {
    const router = useRouter();
    useEffect(() => {
      const token = getToken();
      if (!token) {
        router.push("/admin/login");
      }
      router.push("/admin/products");
    }, [router]);

    return <WrappedComponent {...props} />;
  };
}
