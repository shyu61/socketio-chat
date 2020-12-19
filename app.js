const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

const PORT = process.env.PORT || 3000;

app.use(express.static(`${__dirname}/public`));

app.get('/', (req, res) => {
  res.send(`${__dirname}/index.html`);
});

io.on('connection', socket => {
  socket.on('msg', msg => {
    io.emit('msg', msg);
  });
});

http.listen(PORT, () => {
  console.log(`Server listening. Port: ${PORT}`);
});
