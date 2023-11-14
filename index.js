const express = require("express");
const { createServer } = require("node:http");
const { join } = require('node:path');
const { Server } = require('socket.io');


const app = express()
const server = createServer(app);
const PORT = 3000;
const io = new Server(server);

app.get('/', (req, res) => {
    res.sendFile(join(__dirname, 'index.html'));
});

io.on('connection', (socket) => {
    console.log('Usuario conectado');
  
    // Escucha el evento 'mensaje' desde el cliente
    socket.on('mensajesvue', (data) => {
      console.log(`Mensaje recibido: ${data}`);
      
      // Emitir el mensaje a todos los clientes conectados
      socket.emit('mensaje', data);
    });
  
    // Manejar la desconexión del usuario
    socket.on('disconnect', () => {
      console.log('Usuario desconectado');
    });
  });

server.listen(PORT, () => {
    console.log("SERVIDOR ARRANCANDO DESDE http://localhost:" + PORT);
});
