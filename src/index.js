'use strict'
/**
 * [EN]    Adds a new DocTimeStamp (renotarization) to a PDF via the SolidSign API. Does not
 *         require a signing certificate.
 *         Setup: npm install && cp .env.example .env  (edit .env)
 *         Run:   npm start
 *         POST http://localhost:3099/api/pdf/renotarize/form
 *
 * [PT-BR] Adiciona um novo DocTimeStamp (renotarização) a um PDF via SolidSign API. Não exige
 *         certificado de assinatura.
 */
require('dotenv').config()
const Fastify = require('fastify')

const fastify = Fastify({ logger: true })
fastify.register(require('@fastify/multipart'))

fastify.post('/api/pdf/renotarize/form', async (request, reply) => {
  const parts = request.parts()
  const files = []
  const fields = {}

  for await (const part of parts) {
    if (part.file) {
      files.push({ buffer: await part.toBuffer(), filename: part.filename })
    } else {
      fields[part.fieldname] = part.value
    }
  }

  const auth = fields.authorization || process.env.SOLIDSIGN_AUTHORIZATION
  const base = (fields.baseUrl || process.env.SOLIDSIGN_BASE_URL || '').replace(/\/$/, '')

  const form = new FormData()
  files.forEach((f, i) => form.append(`document[${i}]`, new Blob([f.buffer]), f.filename))
  if (fields.hashAlgorithm) form.append('hashAlgorithm', fields.hashAlgorithm)
  if (fields.reason) form.append('reason', fields.reason)
  if (fields.location) form.append('location', fields.location)
  if (fields.contact) form.append('contact', fields.contact)

  const resp = await fetch(`${base}/solidsign/dsig/extending/pdf/add-doctimestamp`, {
    method: 'POST',
    headers: { Authorization: auth },
    body: form,
  })
  const body = await resp.json().catch(() => ({}))
  reply.status(resp.status).send(body)
})

fastify.listen({ port: Number(process.env.PORT ?? 3099), host: '0.0.0.0' }, err => {
  if (err) { fastify.log.error(err); process.exit(1) }
})
