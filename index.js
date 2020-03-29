const http = require('http')
const express = require('express')
const socketIO = require('socket.io')
const path = require('path')
const randomColor = require('randomcolor')

const PORT = process.env.PORT || 5000
const INDEX = path.resolve(__dirname, '../index.html')

const app = express()
const server = http.createServer(app)
const io = socketIO(server)
const brushes = []

app.get('/', (req, res) => res.sendFile(INDEX))

io.on('connection', (socket) => {
  let brush = { color: randomColor({ luminosity: 'bright' }), strokes: [] }
  brushes.push(brush)

  socket.on('strokes', (strokes) => {
    brush.strokes.push(...strokes)
    io.emit('paint', brush.color, strokes)
  })

  socket.on('refresh', () => {
    brushes.forEach(b => socket.emit('paint', b.color, b.strokes))
  })
})

server.listen(PORT, () => console.log(`Listening on ${PORT}`))