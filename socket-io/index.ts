/* eslint-disable no-process-env */
import cors from 'cors'
import express from 'express'
import { createServer } from 'node:http'
import { Server } from 'socket.io'

import messageRouter from './controllers/messageRouter'
import { connectHandler } from './handler/connect-handler'
import { messageHandler } from './handler/message-handler'
import { roomHandler } from './handler/room-handler'

const app = express()
const server = createServer(app)

export const io = new Server(server, {
  cors: {
    origin: process.env['CLIENT_URL'],
  },
  connectionStateRecovery: {},
})

app.use(express.json())
app.use(cors({
  origin: process.env['CLIENT_URL'],
}))

app.get('/', (_req, res) => res.json({ status: 'ok' }))
app.use('/message', messageRouter)

io.on('connection', (socket) => {
  connectHandler(io, socket)
  messageHandler(io, socket)
  roomHandler(io, socket)
})

const PORT = process.env['PORT'] || 3001
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`)
})
