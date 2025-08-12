const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');
const cors = require('cors');

const app = express();
const server = http.createServer(app);

// CORS para rutas HTTP
app.use(cors());

// CORS para WebSocket
const io = new Server(server, {
  cors: {
    origin: "*", // Cambia esto por "https://tuusuario.itch.io" en producción
    methods: ["GET", "POST"]
  }
});

// Servir archivos estáticos si lo necesitas
// app.use(express.static(path.join(__dirname, 'dist')));

io.on('connection', (socket) => {
  console.log('Cliente conectado:', socket.id);

  socket.on('mensaje_cliente', (data) => {
    console.log('Mensaje del cliente:', data);
    io.emit('mensaje_servidor', `Echo: ${data}`);
  });

  socket.on('disconnect', () => {
    console.log('Cliente desconectado:', socket.id);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Servidor activo en http://localhost:${PORT}`);
});
