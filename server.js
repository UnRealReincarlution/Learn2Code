const hostname = '127.0.0.1';
const port = 5500;

const express = require('express');
const app = express();
const server = require('http').createServer(app);
const path = require('path')
const morgan = require('morgan')

app.use(express.static(path.join(__dirname, 'public')));
app.use(morgan('combined'))

//Create HTTP server and listen on port 3000 for requests
app.get('/code', async function (req, res) {
  console.log(req.server);
  res.sendFile(path.join(__dirname + '/public/code.html'));
});

app.get('/teacher', async function (req, res) {
  console.log(req);
  res.sendFile(path.join(__dirname + '/public/teacher.html'));
});

app.get('/', async function (req, res) {
  res.sendFile(path.join(__dirname + '/public/index.html'));
});

//listen for request on port 3000, and as a callback function have the port listened on logged
server.listen(port, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

