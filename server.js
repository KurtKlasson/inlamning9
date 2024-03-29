const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

var mysql = require('mysql');
const { waitForDebugger } = require('inspector');

var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "chatbot"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on("message", (data) => {
        console.log(data)
        socket.emit("receive message", data);

        const searchQuery = "SELECT output FROM answers WHERE input = '" + data + "'";
        connection.query(searchQuery, (err, results) => {
            if (err) throw err;
            if (results.length > 0) {
                console.log("Lyckades med hämtning")
              socket.emit("receive message", results[0].output);
            }
             else {
                console.log("Misslyckades med hämtning")
              socket.emit(
                "receive message",
                "förlåt, jag förstår inte din fråga. Försök igen."
              );
            }
          })
    })
});