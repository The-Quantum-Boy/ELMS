import { Server } from "socket.io";

const io = new Server({ 
    cors:{
        origin: "https://localhost:3000",
    },
});

io.on("connection", (socket) => {
  console.log("someone has connected to socket");

  socket.on("disconnect", () => {
      console.log("Someone has left");
  })
});

io.listen(3001);