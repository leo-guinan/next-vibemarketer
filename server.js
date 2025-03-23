const { createServer } = require('http')
const { parse } = require('url')
const next = require('next')
const NodeMediaServer = require('node-media-server')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

// RTMP Server config
const config = {
  rtmp: {
    port: 1935,
    chunk_size: 60000,
    gop_cache: true,
    ping: 30,
    ping_timeout: 60
  },
  http: {
    port: 8000,
    allow_origin: '*'
  }
}

const nms = new NodeMediaServer(config)
nms.run()

app.prepare().then(() => {
  createServer((req, res) => {
    const parsedUrl = parse(req.url, true)
    handle(req, res, parsedUrl)
  }).listen(3000, (err) => {
    if (err) throw err
    console.log('> Ready on http://localhost:3000')
    console.log('> RTMP Server running on rtmp://localhost:1935/live')
  })
}) 