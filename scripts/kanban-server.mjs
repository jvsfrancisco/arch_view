import http from 'node:http'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const BACKLOG_PATH = path.resolve(__dirname, '../docs/backlog-whatsapp.md')
const HTML_PATH = path.resolve(__dirname, 'kanban.html')
const PORT = Number(process.env.PORT) || 5175

const VALID_STATUS = ['Backlog', 'A fazer', 'Em andamento', 'Concluído']

function readBacklog() {
  return fs.readFileSync(BACKLOG_PATH, 'utf8')
}

// Strips markdown emphasis and collapses the soft wraps used in the backlog.
function clean(value) {
  return value.replace(/\*\*/g, '').replace(/\s*\n\s*/g, ' ').trim()
}

// `$(?![\s\S])` is end-of-text: a bare `$` under /m would match every line end.
const UNTIL_NEXT_FIELD = '(?=\\n- |\\n\\n|$(?![\\s\\S]))'

function field(section, label) {
  const m = section.match(new RegExp(`^- \\*\\*${label}:\\*\\* ([\\s\\S]*?)${UNTIL_NEXT_FIELD}`, 'm'))
  return m ? clean(m[1]) : ''
}

// One card per `## <title> \`BL-##\`` heading, with everything the board needs.
function parseCards(text) {
  const cards = {}
  const re = /^## (.+?)\s*`(BL-\d+)`\n([\s\S]*?)(?=\n## |$(?![\s\S]))/gm
  let m
  while ((m = re.exec(text))) {
    const [, heading, id, section] = m
    const origin = section.match(new RegExp(`^- Origem: ([\\s\\S]*?)${UNTIL_NEXT_FIELD}`, 'm'))
    cards[id] = {
      id,
      title: clean(heading).replace(/^\d+\.\s*/, ''),
      tag: field(section, 'Tag') || 'geral',
      desc: field(section, 'Item'),
      origin: origin ? clean(origin[1]) : '',
      status: field(section, 'Status') || 'Backlog',
    }
  }
  return cards
}

function updateStatus(text, id, status) {
  const re = new RegExp('(##[^\\n]*`' + id + '`[\\s\\S]*?\\n- \\*\\*Status:\\*\\* )([^\\n]*)')
  if (!re.test(text)) throw new Error(`BL id not found: ${id}`)
  return text.replace(re, (_, pre) => pre + status)
}

function send(res, status, body, contentType) {
  res.writeHead(status, { 'Content-Type': contentType, 'Access-Control-Allow-Origin': '*' })
  res.end(body)
}

const server = http.createServer(async (req, res) => {
  try {
    if (req.method === 'GET' && req.url === '/') {
      return send(res, 200, fs.readFileSync(HTML_PATH, 'utf8'), 'text/html; charset=utf-8')
    }

    if (req.method === 'GET' && req.url === '/api/status') {
      const cards = parseCards(readBacklog())
      return send(res, 200, JSON.stringify(cards), 'application/json')
    }

    if (req.method === 'OPTIONS' && req.url === '/api/status') {
      res.writeHead(204, {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      })
      return res.end()
    }

    if (req.method === 'POST' && req.url === '/api/status') {
      const chunks = []
      for await (const chunk of req) chunks.push(chunk)
      const { id, status } = JSON.parse(Buffer.concat(chunks).toString('utf8') || '{}')

      if (!id || !VALID_STATUS.includes(status)) {
        return send(res, 400, JSON.stringify({ error: 'id and a valid status are required' }), 'application/json')
      }

      const updated = updateStatus(readBacklog(), id, status)
      fs.writeFileSync(BACKLOG_PATH, updated, 'utf8')
      console.log(`[kanban] ${id} -> ${status}`)
      return send(res, 200, JSON.stringify(parseCards(updated)), 'application/json')
    }

    send(res, 404, 'Not found', 'text/plain')
  } catch (err) {
    console.error(err)
    send(res, 500, JSON.stringify({ error: String(err.message || err) }), 'application/json')
  }
})

server.listen(PORT, () => {
  console.log(`Kanban rodando em http://localhost:${PORT}`)
  console.log(`Editando: ${BACKLOG_PATH}`)
})
