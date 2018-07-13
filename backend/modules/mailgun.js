const config = require('./config');

module.exports = (data) => {
    const api_key = config.mailgun;
    const DOMAIN = 'mailgun.dami95.pl'; //@TODO it should be also in config file
    const mailgun = require('mailgun-js')({apiKey: api_key, domain: DOMAIN});

    return new Promise((resolve, reject) => {
        mailgun.messages().send(data, (error, body) => {
            if (error) {
              reject(error);
            } else {
              resolve(body);
            }
        });
    });
};