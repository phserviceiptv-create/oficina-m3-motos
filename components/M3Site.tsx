"use client";

import { useEffect, useMemo, useState } from "react";
import LeadForm from "./LeadForm";
import ServiceCard from "./ServiceCard";

const SUPABASE_URL = "https://gauegoqvroihyvgaunhr.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_0lpkrYNuNENVjepD3NPevQ_YSa5Yb9p";

const services = [
  { name: "Revisão Geral / Preventiva", description: "Checklist completo para segurança, confiabilidade e rotina.", icon: "Wrench" },
  { name: "Motor e Manutenção", description: "Diagnóstico e manutenção com foco em funcionamento e durabilidade.", icon: "Cog" },
  { name: "Injeção Eletrônica / Carburador", description: "Diagnóstico e acerto do sistema de alimentação da moto.", icon: "Gauge" },
  { name: "Peças e Acessórios", description: "Instalação de peças e acessórios para sua moto.", icon: "Settings" },
];

const partsCarousel = [
  {
    title: "Freio & precisão",
    eyebrow: "Sistema de frenagem",
    image:
      "https://images.unsplash.com/photo-1770400770192-05b8b1cdb8fb?auto=format&fit=crop&fm=jpg&q=85&w=1600",
  },
  {
    title: "Corrente & relação",
    eyebrow: "Transmissão",
    image:
      "https://images.unsplash.com/photo-1525207106105-b340f7384b30?auto=format&fit=crop&fm=jpg&q=85&w=1600",
  },
  {
    title: "Suspensão dianteira",
    eyebrow: "Controle & segurança",
    image:
      "https://images.unsplash.com/photo-1770400770316-2e10624114b1?auto=format&fit=crop&fm=jpg&q=85&w=1600",
  },
  {
    title: "Disco & pinça",
    eyebrow: "Manutenção",
    image:
      "https://images.unsplash.com/photo-1779391220731-454e5c23c453?auto=format&fit=crop&fm=jpg&q=85&w=1600",
  },
  {
    title: "Roda & conjunto",
    eyebrow: "Detalhes que importam",
    image:
      "https://images.unsplash.com/photo-1769537754999-724044ec2e32?auto=format&fit=crop&fm=jpg&q=85&w=1600",
  },
];

type InstagramMedia = {
  id: string;
  caption?: string | null;
  permalink?: string | null;
  public_url?: string | null;
  original_url?: string | null;
  media_type?: string | null;
};

function M3Logo({ large = false }: { large?: boolean }) {
  return (
    <span className={large ? "m3-logo m3-logo-lg" : "m3-logo"} aria-label="Oficina M3 Motos">
      <span className="m3-logo-ring m3-logo-ring-outer" />
      <span className="m3-logo-ring m3-logo-ring-inner" />
      <span className="m3-logo-pistons">↗↙</span>
      <span className="m3-logo-text">M3</span>
      <span className="m3-logo-sub">MOTOS</span>
    </span>
  );
}

export default function M3Site() {
  const [menu, setMenu] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const [instagramMedia, setInstagramMedia] = useState<InstagramMedia[]>([]);
  const [profilePicture, setProfilePicture] = useState<string | null>(null);

  const activePart = partsCarousel[activeSlide];

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % partsCarousel.length);
    }, 4800);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function loadInstagram() {
      try {
        const headers = {
          apikey: SUPABASE_PUBLISHABLE_KEY,
          Authorization: `Bearer ${SUPABASE_PUBLISHABLE_KEY}`,
        };

        const [mediaResponse, profileResponse] = await Promise.all([
          fetch(
            `${SUPABASE_URL}/rest/v1/instagram_media?select=id,caption,permalink,public_url,original_url,media_type&active=eq.true&order=published_at.desc&limit=9`,
            { headers, cache: "no-store" }
          ),
          fetch(
            `${SUPABASE_URL}/rest/v1/instagram_profile?select=profile_picture_url&limit=1`,
            { headers, cache: "no-store" }
          ),
        ]);

        if (!cancelled && mediaResponse.ok) {
          const data = (await mediaResponse.json()) as InstagramMedia[];
          setInstagramMedia(
            data.filter((item) => item.public_url || item.original_url)
          );
        }

        if (!cancelled && profileResponse.ok) {
          const data = (await profileResponse.json()) as Array<{
            profile_picture_url?: string | null;
          }>;
          setProfilePicture(data[0]?.profile_picture_url || null);
        }
      } catch {
        // The page keeps working with the visual carousel if Instagram sync is not configured.
      }
    }

    loadInstagram();
    return () => {
      cancelled = true;
    };
  }, []);

  const instagramCards = useMemo(() => instagramMedia.slice(0, 6), [instagramMedia]);

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#060606] text-white">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-black/75 backdrop-blur-xl">
        <div className="container flex h-[76px] items-center justify-between">
          <a href="#" className="flex items-center gap-3">
            {profilePicture ? (
              <img
                src={profilePicture}
                alt="Logo da Oficina M3 Motos"
                className="h-11 w-11 rounded-full border border-orange-400/70 object-cover"
              />
            ) : (
              <M3Logo />
            )}
            <span>
              <strong className="block text-sm tracking-[.16em]">OFICINA M3</strong>
              <small className="text-[10px] uppercase tracking-[.28em] text-zinc-500">Motos</small>
            </span>
          </a>

          <nav className="hidden items-center gap-7 text-sm font-bold text-zinc-400 lg:flex">
            <a href="#servicos" className="transition hover:text-white">Serviços</a>
            <a href="#pecas" className="transition hover:text-white">Peças em destaque</a>
            <a href="#instagram" className="transition hover:text-white">Instagram</a>
            <a href="#contato" className="transition hover:text-white">Contato</a>
          </nav>

          <a
            href="https://wa.me/5585992913882?text=Olá%20Lucas!%20Vim%20pelo%20site%20da%20Oficina%20M3%20Motos."
            target="_blank"
            rel="noreferrer"
            className="hidden items-center gap-2 rounded-full bg-orange-500 px-5 py-3 text-sm font-black text-black transition hover:bg-orange-400 sm:flex"
          >
            <span aria-hidden="true">◉</span>
            WhatsApp
          </a>

          <button
            className="rounded-lg border border-white/10 px-3 py-2 lg:hidden"
            onClick={() => setMenu(!menu)}
            aria-label="Abrir menu"
          >
            {menu ? "×" : "☰"}
          </button>
        </div>

        {menu && (
          <div className="border-t border-white/10 bg-black p-5 lg:hidden">
            <div className="container flex flex-col gap-4 text-sm font-bold">
              <a href="#servicos" onClick={() => setMenu(false)}>Serviços</a>
              <a href="#pecas" onClick={() => setMenu(false)}>Peças em destaque</a>
              <a href="#instagram" onClick={() => setMenu(false)}>Instagram</a>
              <a href="#contato" onClick={() => setMenu(false)}>Contato</a>
            </div>
          </div>
        )}
      </header>

      <section className="hero-premium pt-[76px]">
        <div className="hero-grid absolute inset-0 opacity-30" />
        <div className="container relative grid min-h-[calc(100vh-76px)] items-center gap-12 py-14 lg:grid-cols-[.92fr_1.08fr] lg:py-20">
          <div className="relative z-10 max-w-2xl">
            <div className="flex items-center gap-4">
              <M3Logo large />
              <span className="h-px w-16 bg-orange-500/60" />
              <span className="text-xs font-black uppercase tracking-[.24em] text-orange-400">Fortaleza · CE</span>
            </div>

            <p className="mt-9 text-sm font-black uppercase tracking-[.28em] text-zinc-500">
              Mecânica • peças • acessórios
            </p>

            <h1 className="mt-4 text-[clamp(3.5rem,8vw,7.8rem)] font-black leading-[.82] tracking-[-.07em]">
              SUA MOTO
              <span className="block text-gradient">MERECE M3.</span>
            </h1>

            <p className="mt-8 max-w-xl text-base leading-7 text-zinc-400 sm:text-lg">
              Diagnóstico direto, manutenção e instalação de peças para manter sua moto pronta para a rua.
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <a
                href="#contato"
                className="group flex items-center gap-3 rounded-xl bg-orange-500 px-6 py-4 font-black text-black transition hover:-translate-y-0.5 hover:bg-orange-400"
              >
                Pedir orçamento
                <span aria-hidden="true">→</span>
              </a>
              <a
                href="#pecas"
                className="rounded-xl border border-white/10 bg-white/[.03] px-6 py-4 font-bold transition hover:border-orange-500/40"
              >
                Ver peças
              </a>
            </div>

            <div className="mt-9 flex flex-wrap gap-5 text-xs font-bold uppercase tracking-[.14em] text-zinc-500">
              <span className="inline-flex items-center gap-2"><span className="text-orange-400">◷</span> Seg–Sáb · 09h–21h</span>
              <span className="inline-flex items-center gap-2"><span className="text-orange-400">⌖</span> Parque Dois Irmãos</span>
            </div>
          </div>

          <div className="relative">
            <div className="hero-orbit absolute -inset-8 rounded-[3rem] border border-orange-500/10" />
            <div className="hero-photo relative min-h-[560px] overflow-hidden rounded-[2.5rem] border border-white/10 bg-black sm:min-h-[650px]">
              {partsCarousel.map((part, index) => (
                <div
                  key={part.title}
                  className={`hero-slide absolute inset-0 transition-opacity duration-700 ${index === activeSlide ? "opacity-100" : "opacity-0"}`}
                  style={{ backgroundImage: `url(${part.image})` }}
                  aria-hidden={index !== activeSlide}
                />
              ))}
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,.04),rgba(0,0,0,.08)_40%,rgba(0,0,0,.92)_100%)]" />
              <div className="absolute left-6 top-6 flex items-center gap-2 rounded-full border border-white/10 bg-black/55 px-3 py-2 text-[10px] font-black uppercase tracking-[.2em] backdrop-blur">
                <span className="h-2 w-2 rounded-full bg-orange-500 shadow-[0_0_14px_rgba(255,106,0,.8)]" />
                Peças & componentes
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                <p className="text-xs font-black uppercase tracking-[.24em] text-orange-400">{activePart.eyebrow}</p>
                <h2 className="mt-2 max-w-lg text-3xl font-black sm:text-5xl">{activePart.title}</h2>
                <div className="mt-6 flex items-center justify-between gap-4">
                  <div className="flex gap-2">
                    {partsCarousel.map((part, index) => (
                      <button
                        key={part.title}
                        onClick={() => setActiveSlide(index)}
                        className={`h-1.5 rounded-full transition-all ${index === activeSlide ? "w-10 bg-orange-500" : "w-4 bg-white/25"}`}
                        aria-label={`Ir para ${part.title}`}
                      />
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => setActiveSlide((activeSlide - 1 + partsCarousel.length) % partsCarousel.length)} className="grid h-11 w-11 place-items-center rounded-full border border-white/15 bg-black/50 backdrop-blur hover:border-orange-400" aria-label="Imagem anterior"><span aria-hidden="true">←</span></button>
                    <button onClick={() => setActiveSlide((activeSlide + 1) % partsCarousel.length)} className="grid h-11 w-11 place-items-center rounded-full bg-orange-500 text-black hover:bg-orange-400" aria-label="Próxima imagem"><span aria-hidden="true">→</span></button>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-5 -left-5 hidden rounded-2xl border border-white/10 bg-[#111] p-4 shadow-2xl sm:block">
              <div className="flex items-center gap-3">
                <M3Logo />
                <div>
                  <p className="text-xs font-black">M3 MOTOS</p>
                  <p className="text-[10px] text-zinc-500">Sua moto em boas mãos.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="servicos" className="section-space">
        <div className="container">
          <div className="max-w-2xl">
            <p className="text-xs font-black uppercase tracking-[.25em] text-orange-400">Serviços</p>
            <h2 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">Do diagnóstico à solução.</h2>
            <p className="mt-4 text-zinc-400">Uma experiência mais direta para você resolver o que sua moto precisa.</p>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-2">{services.map((service) => <ServiceCard key={service.name} {...service} />)}</div>
        </div>
      </section>

      <section id="pecas" className="section-space border-y border-white/10 bg-[#0a0a0a]">
        <div className="container grid gap-10 lg:grid-cols-[.75fr_1.25fr] lg:items-center">
          <div>
            <p className="text-xs font-black uppercase tracking-[.25em] text-orange-400">Peças em destaque</p>
            <h2 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">A parte que você não vê também importa.</h2>
            <p className="mt-5 max-w-lg leading-7 text-zinc-400">
              Um carrossel visual com componentes de moto para deixar a página mais técnica, premium e conectada ao serviço da oficina.
            </p>
            <a href="#contato" className="mt-7 inline-flex items-center gap-2 font-black text-orange-400 hover:text-orange-300">
              Consultar peça ou serviço <span aria-hidden="true">→</span>
            </a>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {partsCarousel.slice(0, 4).map((part, index) => (
              <button
                key={part.title}
                onClick={() => setActiveSlide(index)}
                className={`parts-card group relative aspect-[.78] overflow-hidden rounded-2xl border text-left ${index === activeSlide ? "border-orange-500/70" : "border-white/10"}`}
                style={{ backgroundImage: `url(${part.image})` }}
              >
                <span className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent" />
                <span className="absolute bottom-4 left-4 right-4 text-sm font-black">{part.title}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section id="instagram" className="section-space">
        <div className="container">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-[.25em] text-orange-400">Instagram da oficina</p>
              <h2 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">O trabalho continua no feed.</h2>
              <p className="mt-4 max-w-2xl text-zinc-400">
                Quando a sincronização oficial estiver ativa, as publicações da conta entram aqui automaticamente.
              </p>
            </div>
            <a
              href="https://www.instagram.com/oficina_m3_motos/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 px-5 py-3 text-sm font-black hover:border-orange-500/50"
            >
              <span aria-hidden="true">◎</span>
              @oficina_m3_motos
            </a>
          </div>

          {instagramCards.length > 0 ? (
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {instagramCards.map((media) => (
                <a
                  key={media.id}
                  href={media.permalink || "https://www.instagram.com/oficina_m3_motos/"}
                  target="_blank"
                  rel="noreferrer"
                  className="group relative aspect-square overflow-hidden rounded-3xl border border-white/10 bg-[#101010]"
                >
                  <img
                    src={media.public_url || media.original_url || ""}
                    alt={media.caption || "Publicação da Oficina M3 Motos no Instagram"}
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <span className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />
                  <span className="absolute bottom-5 left-5 right-5 text-xs font-bold text-white/80">Ver publicação no Instagram ↗</span>
                </a>
              ))}
            </div>
          ) : (
            <div className="mt-10 grid gap-4 lg:grid-cols-[1.2fr_.8fr]">
              <div className="instagram-empty relative min-h-[320px] overflow-hidden rounded-3xl border border-white/10 p-7">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(255,106,0,.22),transparent_35%),linear-gradient(135deg,#111,#070707)]" />
                <div className="relative flex h-full flex-col justify-end">
                  <M3Logo large />
                  <p className="mt-5 max-w-md text-2xl font-black">Veja os serviços, motos e bastidores direto no Instagram.</p>
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
                {["Bastidores da oficina", "Serviços realizados", "Novidades e peças"].map((item, index) => (
                  <a
                    key={item}
                    href="https://www.instagram.com/oficina_m3_motos/"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[.025] p-5 transition hover:border-orange-500/40"
                  >
                    <span><span className="block text-xs font-black uppercase tracking-[.18em] text-orange-400">0{index + 1}</span><strong className="mt-1 block">{item}</strong></span>
                    <span className="text-zinc-500" aria-hidden="true">→</span>
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <section id="contato" className="section-space">
        <div className="container grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-xs font-black uppercase tracking-[.25em] text-orange-400">Orçamento rápido</p>
            <h2 className="mt-3 text-4xl font-black sm:text-5xl">Fale com a Oficina M3.</h2>
            <p className="mt-5 max-w-xl text-zinc-400">Informe os dados básicos. O próximo passo é direto pelo WhatsApp.</p>
            <div className="mt-8 grid gap-3 text-sm text-zinc-400">
              <p className="flex items-center gap-3"><span className="text-orange-400">⌖</span> Rua 101, nº 1305 · Parque Dois Irmãos · Fortaleza/CE</p>
              <p className="flex items-center gap-3"><span className="text-orange-400">◷</span> Segunda a sábado · 09h às 21h</p>
              <p className="flex items-center gap-3"><MessageCircle className="h-4 w-4 text-orange-400" /> WhatsApp · (85) 99291-3882</p>
            </div>
          </div>
          <LeadForm />
        </div>
      </section>

      <footer className="border-t border-white/10 bg-black py-10">
        <div className="container flex flex-col gap-4 text-sm text-zinc-500 sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} Oficina M3 Motos</span>
          <div className="flex gap-4">
            <a href="https://wa.me/5585992913882" target="_blank" rel="noreferrer">WhatsApp</a>
            <a href="https://www.instagram.com/oficina_m3_motos/" target="_blank" rel="noreferrer">Instagram</a>
          </div>
        </div>
      </footer>

      <a
        href="https://wa.me/5585992913882?text=Olá%20Lucas!%20Vim%20pelo%20site%20da%20Oficina%20M3%20Motos%20e%20quero%20um%20orçamento."
        target="_blank"
        rel="noreferrer"
        aria-label="Falar no WhatsApp"
        className="fixed bottom-5 right-5 z-50 grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-black shadow-2xl transition hover:scale-105"
      >
        <MessageCircle className="h-6 w-6" />
      </a>
    </main>
  );
}
