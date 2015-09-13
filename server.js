'use strict';

var expressApp = require('express')(),
	bodyParser = require('body-parser'),
	use_sendgrid = require('./modules/Sendgrid/sendgrid.js'),
	use_twilio = require('./modules/Twilio/twilio.js');

expressApp.get('/', function(req, res){
	res.end("Hey Azure");
});

expressApp.use(bodyParser.json());
expressApp.use(bodyParser.urlencoded({
    extended: true
}));

expressApp.post('/',function(req, res){
	res.send({
		message : "Send a Valid Request"
	});
});

expressApp.post('/sendEmail', function(req, res){
	console.info("Request Received", JSON.stringify(req.headers.data));
	var data = JSON.parse(req.headers.data);
	var promise = new Promise(function(resolve, reject){
		use_sendgrid.sendEmail(data.to, data.subject, data.content, resolve, reject);
	}).then(function(){
		console.info("Request Finished");
		res.send({ message : "success"});
	}).catch(function(err){
		res.send({ message : err });
	});
});

expressApp.post('/sendSMS', function(req, res){
	console.info("Request Received", JSON.stringify(req.headers.data));
	var data = JSON.parse(req.headers.data);
	var promise = new Promise(function(resolve, reject){
		use_twilio.sendSMS(data.content, data.to, resolve, reject);
	}).then(function(){
		res.send({ message : "success"});
	}).catch(function(err){
		res.send({ message : err });
	});
});

expressApp.post('/makeCall', function(req, res){
	var data = JSON.parse(req.headers.data);
	var promise = new Promise(function(resolve, reject){
		use_twilio.makeCall(data.to,resolve, reject);
	}).then(function(){
		res.send({ message : "success"});
	}).catch(function(err){
		res.send({ message : err });
	});
});

var server = expressApp.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.info(server.address());
  console.log('Listening at: http://%s:%s', host, port);
});