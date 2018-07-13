const config = require('./modules/config.js');
const express = require('express');
const bodyParser = require('body-parser');
const port = config.port;

const success = require('./modules/success');
const error = require('./modules/error');

const mailgun = require('./modules/mailgun');
const sendgrid = require('./modules/sendgrid');
const prepareData = require('./modules/prepareData');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(port, () => {
    console.log('Backend is ready on localhost:' + port);
});

app.post('/mailgun', (req, res) => {
    let data = prepareData(req.body);

    let sent = mailgun(data);
    sent.then(body => {
        res.send(success(body));
    }).catch(body => {
        res.send(error(body));
    });
});

app.post('/sendgrid', (req, res) => {
    let data = prepareData(req.body);

    let sent = sendgrid(data);
    sent.then(body => {
        res.send(success(body));
    }).catch(body => {
        res.send(error(body.toString()));
    });
});
