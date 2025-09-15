-- Enable RLS on existing tables and create policies

-- Categories table
alter table public.categories enable row level security;
create policy "Anyone can view categories" on public.categories for select using (true);

-- Services table  
alter table public.services enable row level security;
create policy "Anyone can view services" on public.services for select using (true);

-- Service providers table
alter table public.service_providers enable row level security;
create policy "Anyone can view service providers" on public.service_providers for select using (true);
create policy "Service providers can update own data" on public.service_providers for update using (auth.uid()::text = id::text);

-- Provider services table
alter table public.provider_services enable row level security;
create policy "Anyone can view provider services" on public.provider_services for select using (true);
create policy "Providers can manage own services" on public.provider_services for all using (
  provider_id in (select id from public.service_providers where auth.uid()::text = id::text)
);

-- Orders table
alter table public.orders enable row level security;
create policy "Users can view own orders" on public.orders for select using (auth.uid() = user_id);
create policy "Users can create own orders" on public.orders for insert with check (auth.uid() = user_id);
create policy "Users can update own orders" on public.orders for update using (auth.uid() = user_id);

-- Order items table
alter table public.order_items enable row level security;
create policy "Users can view own order items" on public.order_items for select using (
  order_id in (select id from public.orders where auth.uid() = user_id)
);
create policy "Users can create own order items" on public.order_items for insert with check (
  order_id in (select id from public.orders where auth.uid() = user_id)
);

-- Service bookings table
alter table public.service_bookings enable row level security;
create policy "Users can view own service bookings" on public.service_bookings for select using (auth.uid() = user_id);
create policy "Users can create own service bookings" on public.service_bookings for insert with check (auth.uid() = user_id);
create policy "Users can update own service bookings" on public.service_bookings for update using (auth.uid() = user_id);

-- Bookings table
alter table public.bookings enable row level security;
create policy "Users can view own bookings" on public.bookings for select using (auth.uid() = customer_id);
create policy "Users can create own bookings" on public.bookings for insert with check (auth.uid() = customer_id);
create policy "Users can update own bookings" on public.bookings for update using (auth.uid() = customer_id);

-- Reviews table
alter table public.reviews enable row level security;
create policy "Anyone can view reviews" on public.reviews for select using (true);
create policy "Users can create reviews for own bookings" on public.reviews for insert with check (
  booking_id in (select id from public.bookings where auth.uid() = customer_id)
);

-- Payment methods table
alter table public.payment_methods enable row level security;
create policy "Users can view own payment methods" on public.payment_methods for select using (auth.uid() = user_id);
create policy "Users can create own payment methods" on public.payment_methods for insert with check (auth.uid() = user_id);
create policy "Users can update own payment methods" on public.payment_methods for update using (auth.uid() = user_id);
create policy "Users can delete own payment methods" on public.payment_methods for delete using (auth.uid() = user_id);

-- Transactions table
alter table public.transactions enable row level security;
create policy "Users can view own transactions" on public.transactions for select using (auth.uid() = user_id);
create policy "Users can create own transactions" on public.transactions for insert with check (auth.uid() = user_id);

-- Notifications table
alter table public.notifications enable row level security;
create policy "Users can view own notifications" on public.notifications for select using (auth.uid() = user_id);
create policy "Users can update own notifications" on public.notifications for update using (auth.uid() = user_id);
