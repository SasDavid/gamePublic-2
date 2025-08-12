const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');
const cors = require('cors')

const app = express();
const server = http.createServer(app);
const io = new Server(server);


// Permitir solicitudes desde cualquier origen (para pruebas)
app.use(cors());

// O permitir solo desde itch.io
// app.use(cors({ origin: "https://tuusuario.itch.io" }));



// Servir archivos estáticos desde /public
// app.use(express.static(path.join(__dirname, 'dist')));

// Evento de conexión WebSocket
io.on('connection', (socket) => {
  console.log('Cliente conectado:', socket.id);

  socket.on('mensaje_cliente', (data) => {
    console.log('Mensaje del cliente:', data);
    socket.emit('mensaje_servidor', `Echo: ${data}`);
  });

  socket.on('disconnect', () => {
    console.log('Cliente desconectado:', socket.id);
  });
});

// Escuchar en puerto
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Servidor activo en http://localhost:${PORT}`);
});
