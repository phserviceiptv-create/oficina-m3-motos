import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase/admin";

type InstagramMedia = {
  id: string;
  caption?: string;
  media_type?: string;
  media_url?: string;
  thumbnail_url?: string;
  permalink?: string;
  timestamp?: string;
};

export async function POST(request: Request) {
  const secret = process.env.INSTAGRAM_SYNC_SECRET;
  const auth = request.headers.get("authorization");

  if (!secret || auth !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "Não autorizado." }, { status: 401 });
  }

  const base = process.env.INSTAGRAM_GRAPH_URL || "https://graph.instagram.com";
  const token = process.env.INSTAGRAM_ACCESS_TOKEN;
  const userId = process.env.INSTAGRAM_USER_ID;

  if (!token || !userId) {
    return NextResponse.json(
      { error: "Integração do Instagram ainda não configurada." },
      { status: 503 }
    );
  }

  try {
    const fields = "id,caption,media_type,media_url,thumbnail_url,permalink,timestamp";
    const response = await fetch(
      `${base.replace(/\/$/, "")}/${userId}/media?fields=${fields}&access_token=${encodeURIComponent(token)}&limit=12`,
      { cache: "no-store" }
    );

    if (!response.ok) {
      const detail = await response.text();
      return NextResponse.json({ error: "Instagram recusou a consulta.", detail }, { status: 502 });
    }

    const payload = await response.json() as { data?: InstagramMedia[] };
    const items = payload.data || [];
    const supabase = getSupabaseAdmin();

    for (const item of items) {
      if (!item.id || !item.media_url) continue;
      await supabase.from("instagram_media").upsert(
        {
          instagram_id: item.id,
          caption: item.caption || null,
          media_type: item.media_type || null,
          permalink: item.permalink || null,
          original_url: item.media_url,
          public_url: item.media_url,
          published_at: item.timestamp || null,
          active: true,
        },
        { onConflict: "instagram_id" }
      );
    }

    return NextResponse.json({ ok: true, synced: items.length });
  } catch {
    return NextResponse.json({ error: "Falha ao sincronizar Instagram." }, { status: 500 });
  }
}