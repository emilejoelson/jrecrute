// config/socket.js
const configureSocket = (io) => {
    io.on("connection", (socket) => {
      console.log("A client connected");
  
      socket.on("disconnect", () => {
        console.log("A client disconnected");
      });
  
      socket.on("notification", (data) => {
        console.log("Received notification:", data);
        io.emit("notification", data);
      });
    });
  };
  
  module.exports = configureSocket;