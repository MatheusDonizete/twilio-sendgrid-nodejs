'use strict';
var USER = 'matheusDonizete',
	PASS = 'k7jkj99u',
	SENDER = 'matheus@strikexii.com';
var sendgrid = require('sendgrid')(USER, PASS);

module.exports = {	
	sendEmail: function (receiver, subject, content, resolve, reject) {
		var email = new sendgrid.Email({
			to: receiver,
			from: SENDER,
			subject: subject,
			text: content
		});
		sendgrid.send(email, function (err, json) {
			if (err) { 
				reject(err);
				return console.error(err); 
			}
			resolve(json);
			console.log(json);
		});
	}
}
