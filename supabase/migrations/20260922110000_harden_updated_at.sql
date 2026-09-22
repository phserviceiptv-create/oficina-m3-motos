-- Security hardening applied to the existing Supabase schema.
-- Keeps trigger function resolution deterministic and clears the
-- Supabase security advisor warning for mutable search_path.

alter function public.set_updated_at() set search_path = public;
