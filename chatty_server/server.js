// WebSocket Server

const express = require('express');           // Run an express server
const SocketServer = require('ws').Server;    // Allows express server to have websockets
const uuid = require ('uuid/v1');             // Allows unique universal ID generation
const randomColor = require('randomcolor');   // Generates a unique color for users

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });

// Send data to ALL connected users
wss.broadcast = function broadcast(data) {
  wss.clients.forEach(function each(client) {
    client.send(data);
  });
};

// Send data to ALL connected users EXCEPT the current user
wss.broadcastToOthers = function broadcast(data, ws) {
  wss.clients.forEach(function each(client) {
        if (client !== ws) {
          client.send(data);
        }
  });
};

// Scans content for image urls. If it finds any, it removes them from the content string, and puts those strings into an array
function parseImageArray(messageToParse) {
  let imageArray = [];
  const parsedMessage = messageToParse
    .replace(/(https?:\/\/.*\.(?:png|jpg))/g,
      function(match){
        let matchArray = match.split(" ");
        imageArray = matchArray;
        return "";
      });

  return {images: imageArray, content: parsedMessage};
}

// Callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws) => {

  ws.send(JSON.stringify({
    userColor: randomColor( {
      luminosity: 'light'
    })
  }));

  numberOfClients = () => {
    return {numberOfClients: wss.clients.size};
  };

  // Update number of clients on connection
  wss.broadcast(JSON.stringify(numberOfClients()));

  // When a user connects, send a notification to everyone but the current user
  wss.broadcastToOthers(JSON.stringify({
    content: "New user has connected",
    type: "incomingNotification",
    id: uuid()
  }), ws);

  // Triggered when the server receives some data from a client
  ws.on('message', (data)=> {

    // When receiving a message, parse to JSON, add a UUID, then send it back
    parsedData = JSON.parse(data);
    parsedData.id = uuid();

    // Check the type of the message, and convert it correctly before sending it back
    if(parsedData.type === "postMessage") {
      const parsedDataWithImagesSeparated = parseImageArray(parsedData.content);

      parsedData.content = parsedDataWithImagesSeparated.content;
      parsedData.images = parsedDataWithImagesSeparated.images;
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

    // Also update number of clients on a disconnect
    wss.broadcast(JSON.stringify(numberOfClients()));

    // Send disconnect message to all except client
    wss.broadcastToOthers(JSON.stringify({
      content: "A user has disconnected",
      type: "incomingNotification",
      id: uuid()
    }));
  });
});