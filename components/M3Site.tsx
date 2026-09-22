"use client";

import { useState } from "react";
import LeadForm from "./LeadForm";
import ServiceCard from "./ServiceCard";

const services = [
  {
    name: "Revisão Geral / Preventiva",
    description: "Checklist completo para manter sua moto segura, confiável e pronta para a rotina.",
    icon: "Wrench",
  },
  {
    name: "Motor e Manutenção",
    description: "Diagnóstico e manutenção de motor com foco em desempenho, funcionamento e durabilidade.",
    icon: "Cog",
  },
  {
    name: "Injeção Eletrônica / Carburador",
    description: "Acerto e diagnóstico do sistema de alimentação para recuperar resposta e funcionamento.",
    icon: "Gauge",
  },
  {
    name: "Peças e Acessórios",
    description: "Instalação de peças e acessórios para deixar sua moto do jeito que você precisa.",
    icon: "Settings",
  },
];

const portfolio = [
  ["Revisão & diagnóstico", "Precisão", "https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=1000&q=85"],
  ["Motor em foco", "Manutenção", "https://images.unsplash.com/photo-1558980394-0c0f2f7f5d2a?auto=format&fit=crop&w=1000&q=85"],
  ["Detalhe que faz diferença", "Cuidado", "https://images.unsplash.com/photo-1558980664-10ea7c2f2a9b?auto=format&fit=crop&w=1000&q=85"],
];

export default function M3Site() {
  const [open, setOpen] = useState(false);

  return (
    <main>
      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/5 bg-black/70 backdrop-blur-xl">
        <div className="container flex h-20 items-center justify-between">
          <a href="#" className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-orange-500 font-black text-black">M3</div>
            <div>
              <div className="text-sm font-black tracking-[.14em]">OFICINA M3</div>
              <div className="text-[10px] font-bold uppercase tracking-[.22em] text-zinc-500">Motos</div>
            </div>
          </a>

          <nav className="hidden items-center gap-7 text-sm font-semibold text-zinc-400 md:flex">
            <a href="#servicos" className="transition hover:text-white">Serviços</a>
            <a href="#portfolio" className="transition hover:text-white">Motos que cuidamos</a>
            <a href="#contato" className="transition hover:text-white">Contato</a>
            <a href="https://www.instagram.com/oficina_m3_motos/" target="_blank" rel="noreferrer" className="text-white transition hover:text-orange-400">
              ◎ @oficina_m3_motos
            </a>
          </nav>

          <button onClick={() => setOpen((value) => !value)} className="grid h-11 w-11 place-items-center rounded-xl border border-white/10 text-xl md:hidden" aria-label="Abrir menu">
            {open ? "×" : "☰"}
          </button>
        </div>

        {open && (
          <div className="border-t border-white/10 bg-black px-5 py-5 md:hidden">
            <div className="container flex flex-col gap-4 text-sm font-bold">
              <a href="#servicos" onClick={() => setOpen(false)}>Serviços</a>
              <a href="#portfolio" onClick={() => setOpen(false)}>Motos que cuidamos</a>
              <a href="#contato" onClick={() => setOpen(false)}>Contato</a>
              <a href="https://www.instagram.com/oficina_m3_motos/" target="_blank" rel="noreferrer">Instagram</a>
            </div>
          </div>
        )}
      </header>

      <section className="grain relative min-h-[92vh] overflow-hidden pt-20">
        <div className="hero-grid absolute inset-0" />
        <div className="absolute right-[-10%] top-[18%] h-[420px] w-[420px] rounded-full bg-orange-500/10 blur-[110px]" />
        <div className="container relative grid min-h-[calc(92vh-80px)] items-center gap-12 py-20 lg:grid-cols-[1.05fr_.95fr]">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-orange-500/20 bg-orange-500/5 px-4 py-2 text-xs font-black uppercase tracking-[.2em] text-orange-300">
              <span className="h-2 w-2 rounded-full bg-orange-400 shadow-[0_0_14px_#ff6a00]" />
              Parque Dois Irmãos · Fortaleza
            </div>

            <h1 className="max-w-4xl text-5xl font-black leading-[.95] tracking-[-.05em] sm:text-7xl lg:text-[92px]">
              Sua moto.
              <br />
              <span className="text-gradient">Em boas mãos.</span>
            </h1>

            <p className="mt-7 max-w-xl text-base leading-7 text-zinc-400 sm:text-lg">
              Manutenção sem enrolação, diagnóstico direto e cuidado de quem entende que moto boa precisa de serviço bem feito.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a href="#contato" className="inline-flex items-center justify-center gap-2 rounded-xl bg-orange-500 px-6 py-4 font-black text-black transition hover:bg-orange-400">
                Fazer orçamento <span aria-hidden>→</span>
              </a>
              <a href="#servicos" className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 px-6 py-4 font-bold text-white transition hover:bg-white/5">
                Ver serviços <span aria-hidden>↓</span>
              </a>
            </div>

            <div className="mt-10 flex flex-wrap gap-6 text-sm text-zinc-500">
              <span className="inline-flex items-center gap-2"><b className="text-orange-400">✓</b> Atendimento direto</span>
              <span className="inline-flex items-center gap-2"><b className="text-orange-400">◷</b> Seg–Sáb · 09h–21h</span>
            </div>
          </div>

          <div className="relative">
            <div className="metal orange-glow relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-white/10">
              <div className="absolute inset-0 bg-cover bg-center opacity-70 mix-blend-luminosity" style={{ backgroundImage: "url(https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=1200&q=90)" }} />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent" />
              <div className="absolute inset-x-6 bottom-6 rounded-2xl border border-white/10 bg-black/65 p-5 backdrop-blur-md">
                <p className="text-xs font-bold uppercase tracking-[.18em] text-orange-400">M3 MOTOS</p>
                <div className="mt-1 flex items-center justify-between gap-4">
                  <p className="text-xl font-black">Diagnóstico. Serviço. Confiança.</p>
                  <span className="text-2xl text-orange-400">✦</span>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-5 -left-5 hidden rounded-2xl border border-white/10 bg-zinc-950 px-5 py-4 shadow-2xl sm:block">
              <div className="text-2xl font-black">09—21</div>
              <div className="text-[10px] font-bold uppercase tracking-[.18em] text-zinc-500">segunda a sábado</div>
            </div>
          </div>
        </div>
      </section>

      <section id="servicos" className="section-space">
        <div className="container">
          <div className="mb-12 flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <span className="text-xs font-black uppercase tracking-[.25em] text-orange-400">O que fazemos</span>
              <h2 className="mt-3 max-w-2xl text-4xl font-black tracking-tight sm:text-5xl">Serviço certo para cada momento da sua moto.</h2>
            </div>
            <p className="max-w-sm text-sm leading-6 text-zinc-500">Do preventivo ao reparo, você sabe o que está sendo feito e por quê.</p>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {services.map((service) => <ServiceCard key={service.name} {...service} />)}
          </div>
        </div>
      </section>

      <section id="portfolio" className="section-space border-y border-white/5 bg-white/[.015]">
        <div className="container">
          <div className="mb-12">
            <span className="text-xs font-black uppercase tracking-[.25em] text-orange-400">Motos que cuidamos</span>
            <h2 className="mt-3 text-4xl font-black sm:text-5xl">Trabalho que aparece nos detalhes.</h2>
            <p className="mt-4 max-w-2xl text-zinc-400">O portfólio fica preparado para receber as mídias do Instagram da oficina assim que a integração oficial for configurada.</p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {portfolio.map(([title, tag, image]) => (
              <a key={title} href="https://www.instagram.com/oficina_m3_motos/" target="_blank" rel="noreferrer" className="group relative aspect-[4/5] overflow-hidden rounded-3xl border border-white/10">
                <div className="absolute inset-0 bg-cover bg-center transition duration-700 group-hover:scale-105" style={{ backgroundImage: `url(${image})` }} />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                <div className="absolute inset-x-5 bottom-5">
                  <span className="text-xs font-bold uppercase tracking-[.18em] text-orange-400">{tag}</span>
                  <h3 className="mt-1 text-xl font-black">{title}</h3>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="section-space">
        <div className="container grid gap-10 lg:grid-cols-[.8fr_1.2fr] lg:items-center">
          <div>
            <span className="text-xs font-black uppercase tracking-[.25em] text-orange-400">Por que M3</span>
            <h2 className="mt-3 text-4xl font-black sm:text-5xl">Menos promessa. Mais cuidado com a sua moto.</h2>
            <div className="mt-8 space-y-5">
              {[
                ["Atendimento direto", "Você fala com quem entende do serviço e recebe orientação clara."],
                ["Rotina preventiva", "A manutenção preventiva ajuda a reduzir surpresas e preservar o conjunto."],
                ["Praticidade", "Orçamento rápido e atendimento pelo WhatsApp para você não perder tempo."],
              ].map(([title, text]) => (
                <div key={title} className="flex gap-4">
                  <div className="mt-1 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-orange-500 text-black">✓</div>
                  <div><h3 className="font-black">{title}</h3><p className="mt-1 text-sm leading-6 text-zinc-500">{text}</p></div>
                </div>
              ))}
            </div>
          </div>
          <div id="contato"><LeadForm /></div>
        </div>
      </section>

      <footer className="border-t border-white/10 bg-black py-12">
        <div className="container grid gap-10 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-orange-500 font-black text-black">M3</div>
              <div className="font-black tracking-[.14em]">OFICINA M3 MOTOS</div>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-6 text-zinc-500">Sua moto em boas mãos. Atendimento de segunda a sábado, das 09h às 21h.</p>
          </div>
          <div>
            <p className="text-xs font-black uppercase tracking-[.2em] text-zinc-600">Endereço</p>
            <a className="mt-3 flex items-start gap-2 text-sm text-zinc-300 hover:text-white" target="_blank" rel="noreferrer" href="https://www.google.com/maps/search/?api=1&query=Rua%20101%2C%201305%20Parque%20Dois%20Irm%C3%A3os%20Fortaleza%20CE">
              <span className="mt-0.5 text-orange-400">⌖</span> Rua 101, nº 1305 · Parque Dois Irmãos · Fortaleza/CE
            </a>
          </div>
          <div>
            <p className="text-xs font-black uppercase tracking-[.2em] text-zinc-600">Conecte-se</p>
            <div className="mt-3 flex gap-3">
              <a href="https://wa.me/5585992913882" target="_blank" rel="noreferrer" className="rounded-xl border border-white/10 p-3 transition hover:border-orange-500/40 hover:text-orange-400"><MessageCircle className="h-5 w-5" /></a>
              <a href="https://www.instagram.com/oficina_m3_motos/" target="_blank" rel="noreferrer" className="rounded-xl border border-white/10 p-3 text-lg transition hover:border-orange-500/40 hover:text-orange-400">◎</a>
            </div>
          </div>
        </div>
        <div className="container mt-10 border-t border-white/5 pt-6 text-xs text-zinc-600">© {new Date().getFullYear()} Oficina M3 Motos. Todos os direitos reservados.</div>
      </footer>

      <a href="https://wa.me/5585992913882?text=Olá%20Lucas!%20Vim%20pelo%20site%20da%20Oficina%20M3%20Motos%20e%20quero%20um%20orçamento." target="_blank" rel="noreferrer" aria-label="Falar no WhatsApp" className="fixed bottom-5 right-5 z-50 grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-black shadow-2xl shadow-green-500/20 transition hover:scale-105">
        <MessageCircle className="h-7 w-7" />
      </a>
    </main>
  );
}
