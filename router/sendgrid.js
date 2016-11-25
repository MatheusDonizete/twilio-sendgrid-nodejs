'use strict';
const sendgridHelper = require('../modules/sendgrid-helper');
module.exports = {
    path: '/sendEmail',
    method: 'post',
    answer: (req, res) => {
        const data = req.body;
        sendgridHelper.sendEmail(data.to, data.subject, data.content).then(function () {
            console.info("Request Finished");
            res.send({ message: "success" });
        }).catch(function (err) {
            res.send({ message: err });
        });
    }
};