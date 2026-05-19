import { Skeleton } from "@/components/BoneyardSkeleton";
import { notFound } from "next/navigation";
import { createAdminClient } from "@/lib/supabase/admin";
import AdminOrderDetail from "@/components/admin/AdminOrderDetail";

export const dynamic = "force-dynamic";

export default async function AdminOrderDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const admin = createAdminClient();

  const { data: order } = await admin
    .from("orders")
    .select("*, order_items(*)")
    .eq("id", params.id)
    .single();

  if (!order) notFound();

  const { data: events } = await admin
    .from("payment_events")
    .select("*")
    .eq("order_id", order.id)
    .order("created_at", { ascending: true });

  return (
    <Skeleton name="admin-order-detail" loading={false}>
      <AdminOrderDetail order={order} paymentEvents={events ?? []} />
    </Skeleton>
  );
}
