const WebSocket = require('ws');

// Create the new WebSocket server listenning on port 80
const wss = new WebSocket.Server({ port: 80 });

wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(data) { 
    wss.clients.forEach(function each(client) {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
      	// On a message reception if any client is not the sender and is communicating with the server, send him the new data (aka message)
        client.send(data);
      }
    });
  });
});