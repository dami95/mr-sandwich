const config = require('./config');

module.exports = (data) => {
    const sgMail = require('@sendgrid/mail');
    const apiKey = config.sendgrid;

    sgMail.setApiKey(apiKey);

    return sgMail.send(data);
}

