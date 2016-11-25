'use strict';
const config = require('config');
const twilio = require('twilio');
const client = twilio(config.accountsid, config.authToken);

module.exports = {
	sendSMS: (body, receiver) => new Promise((resolve, reject) => {
		console.info('Sending Message');
		client.messages.create({
			body: body,
			to: receiver,
			from: config.sender
		}, (err, message) => {
			if (err) {
				console.error(err);
				reject(err);
			} else {
				console.log('Message sended:', message);
				resolve(message);
			}
		});
	}),

	makeCall: (receiver, content = 'http://demo.twilio.com/docs/voice.xml') => new Promise((resolve, reject) => {
		console.info('Making a Call');
		client.calls.create({
			url: content,
			to: receiver,
			from: config.sender
		}, (err, message) => {
			if (err) {
				console.error(err);
				reject(err);
			} else {
				console.log('Call finished:', message);
				resolve(message);
			}
		});		
	})
};