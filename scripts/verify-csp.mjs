import { createHash } from 'node:crypto'
import { readFileSync } from 'node:fs'

const html = readFileSync('dist/index.html', 'utf8')
const headers = readFileSync('dist/_headers', 'utf8')
const script = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)

if (!script) {
  console.error('CSP verification failed: JSON-LD script not found in dist/index.html')
  process.exit(1)
}

const hash = createHash('sha256').update(script[1]).digest('base64')
const directive = `'sha256-${hash}'`

if (!headers.includes(directive)) {
  console.error(`CSP verification failed: add ${directive} to dist/_headers`)
  process.exit(1)
}

console.log(`CSP verification passed: ${directive}`)