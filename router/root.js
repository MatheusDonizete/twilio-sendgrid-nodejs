'use strict';
module.exports = [{
    path: '/',
    method: 'get',
    answer: (req, res) => {
        res.send('<h1>Hello World, Twilio and Sendgrid!</h1>')
    }
},{
    path: '/',
    method: 'post',
    answer: (req, res) => {
        res.send({ message: "Send a Valid Request" });
    }
}];
