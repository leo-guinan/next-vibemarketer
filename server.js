const { createServer } = require('http')
const { parse } = require('url')
const next = require('next')
const { Server } = require('socket.io')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  const server = createServer((req, res) => {
    const parsedUrl = parse(req.url, true)
    handle(req, res, parsedUrl)
  })

  const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
  })

  // Handle WebRTC signaling
  io.on('connection', (socket) => {
    console.log('Client connected:', socket.id)

    // Handle room joining
    socket.on('join-room', (roomId) => {
      socket.join(roomId)
      socket.to(roomId).emit('user-connected', socket.id)
    })

    // Handle WebRTC signaling
    socket.on('signal', ({ to, from, signal }) => {
      io.to(to).emit('signal', { from, signal })
    })

    // Handle disconnection
    socket.on('disconnect', () => {
      console.log('Client disconnected:', socket.id)
      io.emit('user-disconnected', socket.id)
    })
  })

  const port = process.env.PORT || 8080
  server.listen(port, (err) => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
}) 