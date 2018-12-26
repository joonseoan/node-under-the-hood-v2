const http = require('http');

const routes = require('./app2_sub');

// const server = http.createServer((req, res) => {

//     requestHandler(req, res);

// });

const server = http.createServer(routes);

server.listen(3000);

