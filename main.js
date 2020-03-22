"use strict"

const server = require('./server/index.js');

const main = () => {
    // starting web server
    server.loadExpressServer();
}

main();