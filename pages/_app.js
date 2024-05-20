import Layout from "../components/Layout";
import { useRouter } from "next/router";
import LogoPage from "@/components/LogoPage";
export default function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <LogoPage />
      <Component {...pageProps} />
    </Layout>
  );
}
