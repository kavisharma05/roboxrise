export type OrderStatus = "pending" | "paid" | "failed" | "cancelled" | "refunded";
export type PaymentStatus = "pending" | "authorized" | "captured" | "failed" | "refunded";

export interface OrderItem {
  id: string;
  order_id: string;
  product_id: string;
  product_sku: string | null;
  product_name: string;
  unit_price: number;
  quantity: number;
  line_total: number;
}

export interface Address {
  id: string;
  line1: string;
  line2: string | null;
  city: string;
  state: string;
  postal_code: string;
  country: string;
}

export interface ShippingAddressSnapshot {
  first_name?: string;
  last_name?: string;
  line1: string;
  line2?: string | null;
  city: string;
  state: string;
  postal_code: string;
  country: string;
  phone?: string | null;
}

export interface Order {
  id: string;
  user_id: string | null;
  status: OrderStatus;
  payment_status: PaymentStatus;
  currency: string;
  subtotal_amount: number;
  shipping_amount: number;
  tax_amount: number;
  total_amount: number;
  razorpay_order_id: string | null;
  razorpay_payment_id: string | null;
  receipt: string | null;
  contact_email: string;
  contact_phone: string | null;
  customer_first_name: string | null;
  customer_last_name: string | null;
  shipping_address_snapshot: ShippingAddressSnapshot | null;
  email_sent_at: string | null;
  email_failed_at: string | null;
  email_error: string | null;
  created_at: string;
  updated_at: string;
  paid_at: string | null;
  order_items?: OrderItem[];
  addresses?: Address;
}
