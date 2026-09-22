import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "../../../lib/supabase/admin";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, phone, motorcycle_model, service_name, message } = body || {};

    if (!name || !phone || !motorcycle_model) {
      return NextResponse.json({ error: "Campos obrigatórios ausentes." }, { status: 400 });
    }

    const supabase = getSupabaseAdmin();
    const { data, error } = await supabase
      .from("leads")
      .insert({
        name: String(name).slice(0, 120),
        phone: String(phone).slice(0, 40),
        motorcycle_model: String(motorcycle_model).slice(0, 120),
        service_name: service_name ? String(service_name).slice(0, 120) : null,
        message: message ? String(message).slice(0, 1000) : null,
        source: "website",
      })
      .select("id")
      .single();

    if (error) throw error;

    return NextResponse.json({ ok: true, id: data.id });
  } catch {
    return NextResponse.json({ error: "Não foi possível registrar o atendimento." }, { status: 500 });
  }
}
