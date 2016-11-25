'use strict';
const twilioHelper = require('../modules/twilio-helper');
module.exports = [{
    path: '/sendSMS',
    method: 'post',
    answer: (req, res) => {
        const data = req.body;
        twilioHelper.sendSMS(data.content, data.to).then(function () {
            res.send({ message: "success" });
        }).catch(function (err) {
            res.send({ message: err });
        });
    }
},{
    path: '/makeCall',
    method: 'post',
    answer: (req, res) => {
        const data = req.body;
        twilioHelper.makeCall(data.to).then(function () {
            res.send({ message: "success" });
        }).catch(function (err) {
            res.send({ message: err });
        });
    }
}];