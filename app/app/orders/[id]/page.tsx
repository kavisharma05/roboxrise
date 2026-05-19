import { Suspense } from "react";
import { Skeleton } from "@/components/BoneyardSkeleton";
import { redirect, notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import OrderDetailPage from "@/components/OrderDetailPage";
import { createClient } from "@/lib/supabase/server";

export const metadata = {
  title: "Order Details — RoboxRise",
  description: "View your order details.",
};

export default async function OrderDetail({ params }: { params: { id: string } }) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect(`/login?callbackUrl=/orders/${params.id}`);

  const { data: order } = await supabase
    .from("orders")
    .select("*, order_items(*), addresses(*)")
    .eq("id", params.id)
    .single();

  if (!order) notFound();

  return (
    <>
      <Navbar />
      <main>
        <Skeleton name="order-detail" loading={false}>
          <Suspense>
            <OrderDetailPage order={order} />
          </Suspense>
        </Skeleton>
      </main>
      <Footer />
    </>
  );
}
