const express = require("express");
const app = express();
const server = require("http").createServer(app);
const { Server } = require("socket.io");



const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]

    }
});

io.on("connection", (socket) => {
    console.log(`User Connected ${socket.id}`);

    socket.on("join-room", (data) => {
        socket.join(data)
        console.log(`User with ${socket.id  } has joined the room ${data}`)
    })

    socket.on("send-message", (data) => {
      console.log(data);
      socket.to(data.room).emit("receive_message", data)
    })
})





server.listen(9000, () => {
    console.log("Server listening on 9000");
})
