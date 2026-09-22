import { NextResponse } from "next/server";

type InstagramMedia = {
  id: string;
  caption?: string;
  media_type?: string;
  media_url?: string;
  permalink?: string;
  timestamp?: string;
};

export async function POST(request: Request) {
  const syncSecret = process.env.INSTAGRAM_SYNC_SECRET;
  const auth = request.headers.get("authorization");

  if (!syncSecret || auth !== `Bearer ${syncSecret}`) {
    return NextResponse.json({ error: "Não autorizado." }, { status: 401 });
  }

  const base = process.env.INSTAGRAM_GRAPH_URL || "https://graph.instagram.com";
  const token = process.env.INSTAGRAM_ACCESS_TOKEN;
  const userId = process.env.INSTAGRAM_USER_ID;
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey =
    process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!token || !userId) {
    return NextResponse.json(
      { error: "Integração do Instagram ainda não configurada." },
      { status: 503 }
    );
  }

  if (!supabaseUrl || !supabaseKey) {
    return NextResponse.json(
      { error: "Credencial administrativa do Supabase não configurada." },
      { status: 503 }
    );
  }

  try {
    const fields =
      "id,caption,media_type,media_url,thumbnail_url,permalink,timestamp";
    const response = await fetch(
      `${base.replace(/\/$/, "")}/${userId}/media?fields=${fields}&access_token=${encodeURIComponent(token)}&limit=12`,
      { cache: "no-store" }
    );

    if (!response.ok) {
      const detail = await response.text();
      return NextResponse.json(
        { error: "Instagram recusou a consulta.", detail },
        { status: 502 }
      );
    }

    const payload = (await response.json()) as { data?: InstagramMedia[] };
    const items = payload.data || [];

    const rows = items
      .filter((item) => item.id && item.media_url)
      .map((item) => ({
        instagram_id: item.id,
        caption: item.caption || null,
        media_type: item.media_type || null,
        permalink: item.permalink || null,
        original_url: item.media_url || null,
        public_url: item.media_url || null,
        published_at: item.timestamp || null,
        active: true,
      }));

    if (rows.length > 0) {
      const save = await fetch(
        `${supabaseUrl.replace(/\/$/, "")}/rest/v1/instagram_media?on_conflict=instagram_id`,
        {
          method: "POST",
          headers: {
            apikey: supabaseKey,
            "Content-Type": "application/json",
            Prefer: "resolution=merge-duplicates,return=minimal",
          },
          body: JSON.stringify(rows),
        }
      );

      if (!save.ok) {
        const detail = await save.text();
        return NextResponse.json(
          { error: "Falha ao salvar mídias no Supabase.", detail },
          { status: 502 }
        );
      }
    }

    return NextResponse.json({ ok: true, synced: rows.length });
  } catch {
    return NextResponse.json(
      { error: "Falha ao sincronizar Instagram." },
      { status: 500 }
    );
  }
}
