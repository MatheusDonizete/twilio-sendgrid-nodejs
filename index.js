'use strict';
const expressApp = require('express')();
const bodyParser = require('body-parser');
const routes = require('./router');

expressApp.use(bodyParser.json());
expressApp.use(bodyParser.urlencoded({
    extended: true
}));

routes.init(expressApp);

const server = expressApp.listen(process.env.PORT || 1337, function () {
	var host = server.address().address;
	var port = server.address().port;	
	console.log('Listening at: http://%s:%s', host, port);
});