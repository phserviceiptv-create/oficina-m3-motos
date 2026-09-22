# Oficina M3 Motos

Site institucional e de conversão da Oficina M3 Motos, em Fortaleza/CE.

## Stack

- Next.js 16 + App Router
- React + TypeScript
- Tailwind CSS 4
- Framer Motion
- Lucide React
- Supabase PostgreSQL
- Vercel

## Dados do negócio

- **Responsável:** Lucas Barbosa
- **Endereço:** Rua 101, nº 1305 – Parque Dois Irmãos, Fortaleza/CE
- **Horário:** segunda a sábado, 09h–21h
- **WhatsApp:** 85 99291-3882
- **Instagram:** @oficina_m3_motos

## Supabase

Projeto: `oficina-m3-motos`  
URL: `https://gauegoqvroihyvgaunhr.supabase.co`

O banco já possui tabelas para serviços, leads e mídia do Instagram, com RLS ativado.

## Configuração

Copie `.env.example` para `.env.local` e preencha a chave pública do Supabase.

Nunca coloque `SUPABASE_SERVICE_ROLE_KEY` ou token do Instagram em variáveis `NEXT_PUBLIC_*`.

## Instagram

A rota `POST /api/instagram/sync` está preparada para sincronizar mídias quando as credenciais oficiais da integração forem configuradas. A integração fica desativada por padrão até que o token e o identificador sejam adicionados.

## Desenvolvimento

```bash
npm install
npm run dev
```

Abra http://localhost:3000.
