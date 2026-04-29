import { Suspense } from "react";
import { Skeleton } from "@/components/BoneyardSkeleton";
import { redirect } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import OrdersPage from "@/components/OrdersPage";
import { createClient } from "@/lib/supabase/server";

export const metadata = {
  title: "My Orders — RoboRise",
  description: "View your RoboRise order history.",
};

export default async function Orders() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/login?callbackUrl=/orders");

  const { data: orders } = await supabase
    .from("orders")
    .select("*, order_items(*)")
    .order("created_at", { ascending: false });

  return (
    <>
      <Navbar />
      <main>
        <Skeleton name="orders-page" loading={false}>
          <Suspense>
            <OrdersPage orders={orders ?? []} />
          </Suspense>
        </Skeleton>
      </main>
      <Footer />
    </>
  );
}
