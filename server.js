const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);

server.listen(3000, () => {
  console.log("Server started on port 3000");
});


io.on("connection", socket => {
    console.log("A user connected...");
  
    socket.on("send message", message => {
      const searchQuery = `SELECT answer FROM questions_answers WHERE question = '${message}'`;
      connection.query(searchQuery, (err, results) => {
        if (err) throw err;

        if (results.length > 0) {
          socket.emit("receive message", results[0].answer);
        } else {
          socket.emit("receive message", "Sorry, I don't understand your question. Please try again.");
        }
      });
    });
  });   