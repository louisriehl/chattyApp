// server.js

const express = require('express');
const SocketServer = require('ws').Server;

// UUID
const uuid = require ('uuid/v1');

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });

wss.broadcast = function broadcast(data) {
  wss.clients.forEach(function each(client) {
    client.send(data);
  });
};

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws) => {

  wss.broadcastToOthers = function broadcast(data) {
    wss.clients.forEach(function each(client) {
          if (client !== ws) {
            client.send(data);
          }
    });
  };

  wss.broadcast(JSON.stringify({numberOfClients: wss.clients.size}));
  wss.broadcastToOthers(JSON.stringify({
    content: "New user has connected",
    type: "incomingNotification"
    }));
  ws.on('message', (data)=> {
    // When receiving a message, parse to JSON, add a UUID, then send it back
    parsedData = JSON.parse(data);
    parsedData.id = uuid();
    if(parsedData.type === "postMessage") {
      parsedData.type = "incomingMessage";
    } else if (parsedData.type === "postNotification") {
      parsedData.type = "incomingNotification";
    } else {
      throw new Error("Unknown data type", parsedData.type);
    }
    wss.broadcast(JSON.stringify(parsedData));
  });

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => {
    wss.broadcast(JSON.stringify({numberOfClients: wss.clients.size}));
  }
    );
});