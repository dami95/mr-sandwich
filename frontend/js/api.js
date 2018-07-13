window.Api = {
    init: () => {
        var self = {};
        var url = 'http://localhost:8000';

        self.loadRecipients = () => {
            //@TODO there should be function that load data from restapi
            var recipients = [];
            var n = 5;

            for (var i = 0; i < n; i++) {
                recipients[i] = {
                    'id': i,
                    'name': 'Worker'+i,
                    'email': 'example'+i+'@example.com'
                }
            }

            return recipients;
        }

        self.randomMailProvider = () => {
            if (Math.random() > 0.5) {
                return url + '/' + 'mailgun';
            } else {
                return url + '/' + 'sendgrid';
            }
        }

        self.sendMessage = (recipient, subject, content) => {
            var mailUrl = self.randomMailProvider();

            var data = {
                from: 'example@example.com', //@TODO it should be customizable by user
                to: recipients,
                subject,
                text: content
            }

            //@TODO send data to mailUrl
            //return Promise
            //handle success - resolve() promise
            //handle error - try again to get random e-mail provider and send e-mail
        }


        return self;
    }
}