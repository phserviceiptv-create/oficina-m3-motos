"use client";

import { FormEvent, useState } from "react";
import { ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";

const WHATSAPP = "5585992913882";

type Props = {
  serviceName?: string;
};

export default function LeadForm({ serviceName = "" }: Props) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");

    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") || "").trim();
    const phone = String(form.get("phone") || "").trim();
    const motorcycleModel = String(form.get("motorcycleModel") || "").trim();
    const service = String(form.get("service") || serviceName).trim();
    const message = String(form.get("message") || "").trim();

    try {
      const supabase = getSupabaseBrowserClient();
      const { error } = await supabase.from("leads").insert({
        name,
        phone,
        motorcycle_model: motorcycleModel,
        service_name: service || null,
        message: message || null,
        source: "website",
      });

      if (error) throw error;

      const text = encodeURIComponent(
        [
          "Olá Lucas! Vim pelo site da Oficina M3 Motos.",
          "",
          `Nome: ${name}`,
          `Telefone: ${phone}`,
          `Moto: ${motorcycleModel}`,
          `Serviço: ${service || "A definir"}`,
          message ? `Mensagem: ${message}` : "",
        ]
          .filter(Boolean)
          .join("\n")
      );

      setStatus("success");
      window.open(`https://wa.me/${WHATSAPP}?text=${text}`, "_blank", "noopener,noreferrer");
      event.currentTarget.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="glass rounded-3xl p-8 text-center">
        <CheckCircle2 className="mx-auto mb-4 h-12 w-12 text-orange-400" />
        <h3 className="text-2xl font-bold">Solicitação recebida.</h3>
        <p className="mt-2 text-zinc-400">
          Abrimos o WhatsApp para você continuar o atendimento com o Lucas.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-6 text-sm font-semibold text-orange-400"
        >
          Enviar outra solicitação
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="glass rounded-3xl p-6 sm:p-8">
      <div className="mb-7">
        <span className="text-xs font-bold uppercase tracking-[.22em] text-orange-400">
          Orçamento rápido
        </span>
        <h3 className="mt-2 text-2xl font-black sm:text-3xl">Fale com a oficina.</h3>
        <p className="mt-2 text-sm leading-6 text-zinc-400">
          Preencha o básico. O próximo passo é direto pelo WhatsApp.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <input required name="name" placeholder="Seu nome" className="field" />
        <input required name="phone" placeholder="WhatsApp" className="field" />
        <input required name="motorcycleModel" placeholder="Modelo da moto" className="field" />
        <select name="service" defaultValue={serviceName} className="field">
          <option value="">Serviço de interesse</option>
          <option>Revisão Geral / Preventiva</option>
          <option>Motor e Manutenção</option>
          <option>Injeção Eletrônica / Carburador</option>
          <option>Peças e Acessórios</option>
        </select>
      </div>

      <textarea
        name="message"
        placeholder="Conte rapidamente o que sua moto está apresentando..."
        className="field mt-4 min-h-28 resize-y"
      />

      {status === "error" && (
        <p className="mt-3 text-sm text-red-400">
          Não foi possível salvar agora. Tente novamente ou fale direto pelo WhatsApp.
        </p>
      )}

      <button
        disabled={status === "loading"}
        className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-orange-500 px-5 py-4 font-black text-black transition hover:bg-orange-400 disabled:cursor-wait disabled:opacity-70"
      >
        {status === "loading" ? <Loader2 className="h-5 w-5 animate-spin" /> : <ArrowRight className="h-5 w-5" />}
        {status === "loading" ? "Enviando..." : "Solicitar orçamento"}
      </button>
    </form>
  );
}