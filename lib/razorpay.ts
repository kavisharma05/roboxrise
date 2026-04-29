import Razorpay from "razorpay";

/**
 * Razorpay client is created lazily so `next build` doesn't fail when env vars
 * are missing (e.g. during CI preview builds).
 */
let cachedClient: Razorpay | null = null;

export function getRazorpayClient(): Razorpay | null {
  if (cachedClient) return cachedClient;

  const keyId = process.env.RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;

  if (!keyId || !keySecret) return null;

  cachedClient = new Razorpay({ key_id: keyId, key_secret: keySecret });
  return cachedClient;
}

type RazorpayCreateOrderPayload = {
  amount: number;
  currency: string;
  receipt?: string;
  notes?: Record<string, string> | Record<string, number>;
};

type RazorpayCreateOrderResponse = {
  id: string;
  amount: number;
  currency: string;
};

// Backwards-compatible default export for any existing imports.
// Prefer `getRazorpayClient()` for explicit configuration checks.
const razorpay = {
  orders: {
    create: async (payload: RazorpayCreateOrderPayload) => {
      const client = getRazorpayClient();
      if (!client) {
        throw new Error(
          "Razorpay is not configured. Set RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET."
        );
      }

      const typedClient = client as unknown as {
        orders: {
          create: (
            p: RazorpayCreateOrderPayload,
          ) => Promise<RazorpayCreateOrderResponse>;
        };
      };

      return typedClient.orders.create(payload);
    },
  },
};

export default razorpay;
