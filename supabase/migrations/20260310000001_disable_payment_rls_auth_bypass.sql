-- Disable RLS on payment related tables to prevent auth.uid() UUID cast errors
-- This mirrors the approach taken for core tables like profiles and user_roles 
-- where Firebase UIDs (which are not UUIDs) cannot be parsed by Supabase's auth.uid() function.

ALTER TABLE public.orders DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.payment_orders DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_purchases DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_subscriptions DISABLE ROW LEVEL SECURITY;

DO $$ BEGIN RAISE NOTICE 'Payment tables RLS disabled successfully to allow Firebase UUID mapping'; END $$;
