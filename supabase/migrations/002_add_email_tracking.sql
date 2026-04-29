ALTER TABLE public.orders
ADD COLUMN IF NOT EXISTS email_sent_at timestamptz,
ADD COLUMN IF NOT EXISTS email_failed_at timestamptz,
ADD COLUMN IF NOT EXISTS email_error text;

CREATE INDEX IF NOT EXISTS idx_orders_email_failed
ON public.orders(email_failed_at)
WHERE email_failed_at IS NOT NULL;

COMMENT ON COLUMN public.orders.email_sent_at IS 'Timestamp when order confirmation email was successfully sent';
COMMENT ON COLUMN public.orders.email_failed_at IS 'Timestamp of last email send failure';
COMMENT ON COLUMN public.orders.email_error IS 'Last email send error message';
