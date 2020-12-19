const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const crypto = require('crypto');
const PORT = process.env.PORT || 3000;

app.use(express.static(`${__dirname}/public`));

app.get('/', (req, res) => {
  res.send(`${__dirname}/index.html`);
});

io.on('connection', socket => {
  console.log('user connected');

  (() => {
    const token = makeToken(socket.id);
    io.to(socket.id).emit('token', { token: token, iv: iv });
  })();

  socket.on('post', post => {
    io.emit('msg', post);
  });
});

http.listen(PORT, () => {
  console.log(`Server listening. Port: ${PORT}`);
});

const makeToken = id => {
  return crypto.createHash('sha1').update(id).digest('hex');
};
