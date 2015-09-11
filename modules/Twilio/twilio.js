'use strict';

var ACCOUNTSID = 'AC6986667fd1316c94b742c7dc25d8e763',
	AUTH_TOKEN = 'f9147efd286445da5126d6ce51206e77',
	FROM = "(830) 261-4225";

var twilio = require('twilio'),
	client = twilio(ACCOUNTSID, AUTH_TOKEN);

module.exports = {
	sendSMS: function (body, receiver, resolve, reject) {
		console.info("Sending Message");
		client.messages.create({
			body: body,
			to: receiver,
			from: FROM
		}, function (err, message) {
			if (err) {
				console.error(err);
				reject(err);
			} else {
				console.log("Message sended ",message);
				resolve(message);
			}
		});
	},

	makeCall: function (receiver, resolve, reject) {
		client.calls.create({
			url: "http://demo.twilio.com/docs/voice.xml",
			to: receiver,
			from: FROM
		}, function (err, message) {
			if (err) {
				console.error(err);
				reject(err);
			} else {
				console.log(message);
				resolve(message);
			}
		});
		resolve();
	}
};