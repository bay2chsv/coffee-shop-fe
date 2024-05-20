import { useRouter } from "next/router";
import { useEffect } from "react";

export default function index() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/login");
  }, [router]);
  return <></>;
}
