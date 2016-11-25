'use strict';
const bodyParser = require('body-parser');
const fs = require('fs');
const client = process.env.CLIENT ? `/${process.env.CLIENT}` : '';

const routes = fs.readdirSync('./routes')
                .filter((element) => element !== 'index.js' && element !== 'index')
                .map((element) => require(`./${element}`) );

module.exports = {
    init: (server) => {
        routes.forEach((route) => {
            if (route instanceof Array) {
                route.forEach((e) => {
                    if (!e.notBodyParser) {
                        server[e.method](`${client}${e.path}`, bodyParser.json(), e.answer);                                                  
                    } else {
                        server[e.method](`${client}${e.path}`, e.answer);
                    }
                });
            } else {
                if (!route.notBodyParser) {
                    server[route.method](`${client}${route.path}`, bodyParser.json(), route.answer);
                } else {
                    server[route.method](`${client}${route.path}`, route.answer);
                }
            }

        });
    }
}