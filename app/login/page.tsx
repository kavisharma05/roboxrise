import { Suspense } from "react";
import { Skeleton } from "@/components/BoneyardSkeleton";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LoginPage from "@/components/LoginPage";

export const metadata = {
  title: "Login — RoboRise",
  description: "Sign in to your RoboRise account.",
};

export default function Login() {
  return (
    <>
      <Navbar />
      <main>
        <Skeleton name="login-page" loading={false}>
          <Suspense>
            <LoginPage />
          </Suspense>
        </Skeleton>
      </main>
      <Footer />
    </>
  );
}
