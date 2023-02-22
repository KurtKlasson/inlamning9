const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);

server.listen(3000, () => {
  console.log("Server started on port 3000");
});


io.on("connection", socket => {
  
    socket.on("send message", message => {
      const searchQuery = `SELECT svar FROM chatbot_svar WHERE frågor = '${message}'`;
      connection.query(searchQuery, (err, results) => {
        if (err) throw err;

        if (results.length > 0) {
          socket.emit("receive message", results[0].svar);
        } else {
          socket.emit("receive message", "Förlåt jag känner inte till frågan.");
        }
      });
    });
  });   