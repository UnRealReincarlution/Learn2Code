const hostname = '127.0.0.1';
const port = 3300;

const express = require('express');
const app = express();
const server = require('http').createServer(app);
const path = require('path')

app.use(express.static(path.join(__dirname, 'public')));

//Create HTTP server and listen on port 3000 for requests
app.get('/code', async function (req, res) {
  res.sendFile(path.join(__dirname + '/public/code.html'));
});

//listen for request on port 3000, and as a callback function have the port listened on logged
server.listen(port, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

