const server = require("express")()
const http = require('http').Server(server);
const next = require('next')
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

const io = require("socket.io")(http, {
    cors: {
      origin: "*",
    },
  });
  
  const PORT = 3000;
  const NEW_CHAT_MESSAGE_EVENT = "newChatMessage";
  
  io.on("connection", (socket) => {    
    // Join a conversation
    const { roomId } = socket.handshake.query;
    socket.join(roomId);

    // Listen for new messages
    socket.on(NEW_CHAT_MESSAGE_EVENT, (data) => {
      io.in(roomId).emit(NEW_CHAT_MESSAGE_EVENT, data);
    });
  
    // Leave the room if the user closes the socket
    socket.on("disconnect", () => {
      socket.leave(roomId);
    });
  });

app.prepare().then(() => {
    server.get("*", (req, res) => {
        return handle(req, res)
    })

    http.listen(PORT, err => {
        if (err) throw err
        console.log(`:> Now serving localhost:${PORT}`)
    })
})