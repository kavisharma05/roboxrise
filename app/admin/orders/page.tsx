import { Skeleton } from "@/components/BoneyardSkeleton";
import { createAdminClient } from "@/lib/supabase/admin";
import AdminOrdersList from "@/components/admin/AdminOrdersList";

export const metadata = {
  title: "Orders — Admin — RoboRise",
};

export const dynamic = "force-dynamic";

export default async function AdminOrdersPage() {
  const admin = createAdminClient();

  const { data: orders } = await admin
    .from("orders")
    .select("*, order_items(*)")
    .order("created_at", { ascending: false });

  return (
    <Skeleton name="admin-orders" loading={false}>
      <AdminOrdersList orders={orders ?? []} />
    </Skeleton>
  );
}
