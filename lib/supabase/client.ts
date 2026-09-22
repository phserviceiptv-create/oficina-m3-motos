import { createClient } from "@supabase/supabase-js";

const FALLBACK_URL = "https://gauegoqvroihyvgaunhr.supabase.co";
const FALLBACK_KEY = "sb_publishable_0lpkrYNuNENVjepD3NPevQ_YSa5Yb9p";

export function getSupabaseBrowserClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || FALLBACK_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || FALLBACK_KEY;
  return createClient(url, key);
}
