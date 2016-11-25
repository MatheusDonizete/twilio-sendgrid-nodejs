'use strict';
const config = require('./config.js');
const sendgrid = require('sendgrid')(config.user, config.pass);

module.exports = {
	sendEmail: (receiver, subject, content) => {
		return new Promise((resolve, reject) => {
			const email = new sendgrid.Email({
				to: receiver,
				from: config.sender,
				subject: subject,
				text: content
			});
			sendgrid.send(email, function (err, json) {
				if (err) {
					return reject(err);
				}
				return resolve(json);
			});
		});
	}
}
