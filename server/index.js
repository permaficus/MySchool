const fs = require('fs');
const config = JSON.parse(fs.readFileSync('./config/config.json', 'utf-8'));
const routes = require(config.router)
const express = require('express');
const server = new express();
const parser = require('body-parser');

class WebServer {

    static loadExpressServer() {

        server.use(parser.urlencoded({extended: true}));
        server.use(parser.json());
        server.set('view engine', 'ejs');
        server.use('/assets', express.static('./views/assets'));
        server.use('/', routes);
        server.listen(config.port, () => console.log(`Starting EJS Server on port: ${config.port}`))
    
    }
}

module.exports = WebServer;