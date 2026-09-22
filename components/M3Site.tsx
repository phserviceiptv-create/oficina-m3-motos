"use client";

import { useState } from "react";
import LeadForm from "./LeadForm";
import ServiceCard from "./ServiceCard";

const services = [
  { name: "Revisão Geral / Preventiva", description: "Checklist completo para segurança, confiabilidade e rotina.", icon: "Wrench" },
  { name: "Motor e Manutenção", description: "Diagnóstico e manutenção com foco em funcionamento e durabilidade.", icon: "Cog" },
  { name: "Injeção Eletrônica / Carburador", description: "Diagnóstico e acerto do sistema de alimentação da moto.", icon: "Gauge" },
  { name: "Peças e Acessórios", description: "Instalação de peças e acessórios para sua moto.", icon: "Settings" },
];

export default function M3Site() {
  const [menu, setMenu] = useState(false);

  return (
    <main className="min-h-screen bg-[#070707] text-white">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-black/80 backdrop-blur">
        <div className="container flex h-20 items-center justify-between">
          <a href="#" className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-orange-500 font-black text-black">M3</span>
            <span><strong className="block text-sm tracking-[.15em]">OFICINA M3</strong><small className="text-[10px] uppercase tracking-[.2em] text-zinc-500">Motos</small></span>
          </a>
          <nav className="hidden gap-6 text-sm font-bold text-zinc-400 md:flex">
            <a href="#servicos">Serviços</a>
            <a href="#portfolio">Motos que cuidamos</a>
            <a href="#contato">Contato</a>
            <a href="https://www.instagram.com/oficina_m3_motos/" target="_blank" rel="noreferrer">@oficina_m3_motos</a>
          </nav>
          <button className="rounded-lg border border-white/10 px-3 py-2 md:hidden" onClick={() => setMenu(!menu)} aria-label="Menu">{menu ? "×" : "☰"}</button>
        </div>
        {menu && <div className="border-t border-white/10 bg-black p-5 md:hidden"><div className="container flex flex-col gap-4 text-sm font-bold"><a href="#servicos">Serviços</a><a href="#portfolio">Portfólio</a><a href="#contato">Contato</a></div></div>}
      </header>

      <section className="grain pt-20">
        <div className="container grid min-h-[88vh] items-center gap-12 py-20 lg:grid-cols-2">
          <div>
            <span className="inline-flex rounded-full border border-orange-500/20 bg-orange-500/10 px-4 py-2 text-xs font-black uppercase tracking-[.2em] text-orange-300">Parque Dois Irmãos · Fortaleza</span>
            <h1 className="mt-6 text-5xl font-black leading-none tracking-tight sm:text-7xl">Sua moto.<br /><span className="text-gradient">Em boas mãos.</span></h1>
            <p className="mt-7 max-w-xl text-lg leading-8 text-zinc-400">Manutenção sem enrolação, diagnóstico direto e cuidado de quem entende de moto.</p>
            <div className="mt-9 flex flex-wrap gap-3">
              <a href="#contato" className="rounded-xl bg-orange-500 px-6 py-4 font-black text-black hover:bg-orange-400">Fazer orçamento →</a>
              <a href="#servicos" className="rounded-xl border border-white/10 px-6 py-4 font-bold">Ver serviços ↓</a>
            </div>
            <div className="mt-8 flex flex-wrap gap-5 text-sm text-zinc-500"><span>✓ Atendimento direto</span><span>◷ Seg–Sáb · 09h–21h</span></div>
          </div>
          <div className="orange-glow relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-white/10">
            <div className="absolute inset-0 bg-cover bg-center opacity-75" style={{ backgroundImage: "url(https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=1200&q=90)" }} />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 rounded-2xl border border-white/10 bg-black/70 p-5 backdrop-blur">
              <p className="text-xs font-bold uppercase tracking-[.2em] text-orange-400">M3 MOTOS</p>
              <p className="mt-1 text-xl font-black">Diagnóstico. Serviço. Confiança.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="servicos" className="section-space">
        <div className="container">
          <p className="text-xs font-black uppercase tracking-[.25em] text-orange-400">O que fazemos</p>
          <h2 className="mt-3 text-4xl font-black sm:text-5xl">Serviço certo para cada momento.</h2>
          <div className="mt-10 grid gap-4 md:grid-cols-2">{services.map((service) => <ServiceCard key={service.name} {...service} />)}</div>
        </div>
      </section>

      <section id="portfolio" className="section-space border-y border-white/10 bg-white/[.02]">
        <div className="container">
          <p className="text-xs font-black uppercase tracking-[.25em] text-orange-400">Motos que cuidamos</p>
          <h2 className="mt-3 text-4xl font-black sm:text-5xl">Trabalho que aparece nos detalhes.</h2>
          <p className="mt-4 max-w-2xl text-zinc-400">Portfólio preparado para receber as mídias do Instagram da oficina quando a integração oficial for configurada.</p>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {["Revisão & diagnóstico","Motor em foco","Detalhe que faz diferença"].map((title, i) => (
              <a key={title} href="https://www.instagram.com/oficina_m3_motos/" target="_blank" rel="noreferrer" className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-white/10">
                <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(https://images.unsplash.com/photo-${["1558981806-ec527fa84c39","1558980394-0c0f2f7f5d2a","1558980664-10ea7c2f2a9b"][i]}?auto=format&fit=crop&w=1000&q=85)` }} />
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
                <div className="absolute bottom-5 left-5"><span className="text-xs font-bold uppercase tracking-[.18em] text-orange-400">M3 Motos</span><h3 className="mt-1 text-xl font-black">{title}</h3></div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section id="contato" className="section-space">
        <div className="container grid gap-10 lg:grid-cols-2 lg:items-center">
          <div><p className="text-xs font-black uppercase tracking-[.25em] text-orange-400">Orçamento rápido</p><h2 className="mt-3 text-4xl font-black sm:text-5xl">Fale com a Oficina M3.</h2><p className="mt-5 max-w-xl text-zinc-400">Informe seus dados e o serviço desejado. O atendimento segue pelo WhatsApp.</p><div className="mt-7 text-sm text-zinc-400"><p>Rua 101, nº 1305</p><p>Parque Dois Irmãos · Fortaleza/CE</p><p className="mt-2">Segunda a sábado · 09h às 21h</p></div></div>
          <LeadForm />
        </div>
      </section>

      <footer className="border-t border-white/10 bg-black py-10">
        <div className="container flex flex-col gap-4 text-sm text-zinc-500 sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} Oficina M3 Motos</span>
          <div className="flex gap-4"><a href="https://wa.me/5585992913882" target="_blank" rel="noreferrer">WhatsApp</a><a href="https://www.instagram.com/oficina_m3_motos/" target="_blank" rel="noreferrer">Instagram</a></div>
        </div>
      </footer>

      <a href="https://wa.me/5585992913882?text=Olá%20Lucas!%20Vim%20pelo%20site%20da%20Oficina%20M3%20Motos%20e%20quero%20um%20orçamento." target="_blank" rel="noreferrer" aria-label="Falar no WhatsApp" className="fixed bottom-5 right-5 z-50 grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-2xl text-black shadow-2xl">◉</a>
    </main>
  );
}
