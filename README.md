# 🇧🇷 SolidSign API - Exemplo de Integração: Renotarizar PDF (Carimbo do Tempo) (Node.js / Fastify)

Adiciona um novo carimbo de tempo do documento (DocTimeStamp) a um PDF já assinado, renovando a prova de existência sem exigir certificado de assinatura.

## Requisitos

- Node.js 18+ (fetch/FormData nativos), Fastify
- Um token JWT válido (`POST /solidsign/auth/token`)
- Front-end de referência (opcional): [`exemplo-react-pdf-renotarize`](https://github.com/SolidTechSolutions/exemplo-react-pdf-renotarize)

## Como rodar

```bash
npm install && cp .env.example .env   # editar .env
npm start
```

O serviço sobe em `http://localhost:3099`.

## Como funciona

`POST /api/pdf/renotarize/form` — recebe um formulário (`multipart/form-data`) e repassa pra SolidSign API real, devolvendo a resposta como está.

## Variáveis do formulário

| Campo | Significado | Obrigatório |
|---|---|---|
| `document[i]` | PDF(s) a renotarizar | Sim |
| `hashAlgorithm` | Algoritmo de hash | Não |
| `reason / location / contact` | Metadados do carimbo | Não |
| `authorization` | Token JWT (Bearer) — sobrescreve o configurado | Não |
| `baseUrl` | URL base da SolidSign API — sobrescreve o configurado | Não |

---

# 🇬🇧 SolidSign API - Integration Example: PDF Renotarization (DocTimeStamp) (Node.js / Fastify)

Adds a new DocTimeStamp to an already-signed PDF, renewing its proof of existence without requiring a signing certificate.

## Requirements

- Node.js 18+ (native fetch/FormData), Fastify
- A valid JWT token (`POST /solidsign/auth/token`)
- Reference front-end (optional): [`exemplo-react-pdf-renotarize`](https://github.com/SolidTechSolutions/exemplo-react-pdf-renotarize)

## Running

```bash
npm install && cp .env.example .env   # edit .env
npm start
```

The service starts on `http://localhost:3099`.

## How it works

`POST /api/pdf/renotarize/form` — accepts a form (`multipart/form-data`) and forwards it to the real SolidSign API, returning the response as-is.

## Form fields

| Field | Meaning | Required |
|---|---|---|
| `document[i]` | PDF(s) to renotarize | Yes |
| `hashAlgorithm` | Hash algorithm | No |
| `reason / location / contact` | Timestamp metadata | No |
| `authorization` | JWT (Bearer) token — overrides the configured one | No |
| `baseUrl` | SolidSign API base URL — overrides the configured one | No |
