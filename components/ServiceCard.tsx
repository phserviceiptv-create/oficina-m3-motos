"use client";

import { ArrowUpRight, Gauge, Settings, Wrench, Cog } from "lucide-react";
import { motion } from "framer-motion";

const icons = { Wrench, Cog, Gauge, Settings };

type Props = {
  name: string;
  description: string;
  icon?: string | null;
};

export default function ServiceCard({ name, description, icon = "Wrench" }: Props) {
  const Icon = icons[icon as keyof typeof icons] || Wrench;

  const message = encodeURIComponent(
    `Olá Lucas, gostaria de fazer um orçamento rápido para minha moto sobre o serviço: ${name}.`
  );

  return (
    <motion.article
      whileHover={{ y: -6 }}
      transition={{ duration: 0.2 }}
      className="group glass relative overflow-hidden rounded-3xl p-6"
    >
      <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-orange-500/10 blur-3xl transition group-hover:bg-orange-500/20" />
      <div className="relative">
        <div className="mb-8 flex items-center justify-between">
          <div className="grid h-12 w-12 place-items-center rounded-2xl border border-orange-500/20 bg-orange-500/10 text-orange-400">
            <Icon className="h-6 w-6" />
          </div>
          <span className="text-xs font-bold text-zinc-600">M3 / 0{["Revisão Geral / Preventiva","Motor e Manutenção","Injeção Eletrônica / Carburador","Peças e Acessórios"].indexOf(name)+1}</span>
        </div>
        <h3 className="text-xl font-black">{name}</h3>
        <p className="mt-3 min-h-16 text-sm leading-6 text-zinc-400">{description}</p>
        <a
          href={`https://wa.me/5585992913882?text=${message}`}
          target="_blank"
          rel="noreferrer"
          className="mt-7 inline-flex items-center gap-2 text-sm font-black text-orange-400 transition group-hover:text-orange-300"
        >
          Solicitar este serviço <ArrowUpRight className="h-4 w-4" />
        </a>
      </div>
    </motion.article>
  );
}