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
window.App = {
    init: () => {
        var api = Api.init();
        var form = Form.init();
        var list = List.init(api);
        var message = Message.init(api, form, list);
    }
};


document.addEventListener('DOMContentLoaded', App.init);
window.Form = {
    init: () => {
        var self = {};
        var container = document.querySelector('#message form');
        var button = container.querySelector('#send');
        var subject = container.querySelector('#subject');
        var content = container.querySelector('#content');
        var result = container.querySelector('#result');

        //return true if form is correct
        //return element if form element is not correct
        self.formValidation = () => {
            if (!self.getSubjectValue().length) {
                return subject;
            } else if (!self.getContentValue().length) {
                return content;
            }

            return true;
        }

        self.getSubjectValue = (() => subject.value);
        self.getContentValue = (() => content.value);
        self.getButtonElement = (() => button);
        self.getResultElement = (() => result);

        return self;
    }
}
window.List = {
    init: (api) => {
        var self = {};

        var container = document.querySelector('#recipients');
        var addButton = container.querySelector('#add');
        var recipientsList = container.querySelector('.recipients-list');

        self.handleButton = () => {
            addButton.addEventListener('click', function() {
                alert('Here should be possibility to add new recipient.');

                //@TODO and after that send data to addRecipient
            });
        };

        self.loadRecipients = () => {
            return api.loadRecipients();
        }

        self.recipentHandler = (e) => {
            e.preventDefault();

            event.currentTarget.classList.toggle('active');
        };

        self.drawList = () => {
            var recipients = self.loadRecipients();

            recipientsList.innerHTML = '';

            recipients.forEach((el) => {
                var li = document.createElement('li');
                li.dataset.id = el.id;
                li.innerHTML = '<i class="first-icon fas fa-user"></i> ' +
                    '<span class="name">'+el.name+'</span> ' +
                    '<span class="email">'+el.email+'</span> ' +
                    '<i class="checked-icon fas fa-check-square"></i> ' +
                    '<i class="checked-icon far fa-square"></i>';

                li.addEventListener('click', self.recipentHandler);

                recipientsList.appendChild(li);
            });
        }

        self.getCheckedRecipients = () => {
            var recipients = recipientsList.querySelectorAll('li');
            var checkedRecipients = [];

            recipients.forEach((element) => {
                if (element.className.indexOf('active') !== -1) {
                    var id = element.dataset.id;
                    var email = element.querySelector('.email').innerText;
                    var name = element.querySelector('.name').innerText;

                    checkedRecipients.push({id, email, name});
                }

            });

            return checkedRecipients;
        }

        self.addRecipient = (email, name) => {
            //@TODO api.addRecipient(email, name)
            //add li, add event
        }

        self.handleButton();
        self.drawList();

        return self;
    }
}
window.Message = {
    init: (api, form, list) => {
        var self = {};

        self.handleButton = () => {
            form.getButtonElement().addEventListener('click', (e) => {
                e.preventDefault();

                var validation = form.formValidation();
                if (validation === true) {
                    self.showSuccess('Message is correct.');

                    var recipients = list.getCheckedRecipients()
                    if (recipients.length === 0) {
                        self.showError('You need to choose some recipients.');
                    } else {
                        let subject = form.getSubjectValue();
                        let content = form.getContentValue();
                        self.sendMessages(recipients, subject, content);
                    }
                } else {
                    self.showError('Field "'+ validation.id + '" is incorrect.');
                    validation.focus();
                }
            });
        }
        self.showError = (content) => {
            var resultElement = form.getResultElement();
            resultElement.classList.remove('success');
            resultElement.classList.remove('info');
            resultElement.classList.add('error');
            resultElement.innerHTML = content;
        }
        self.showInfo = (content) => {
            var resultElement = form.getResultElement();
            resultElement.classList.remove('error');
            resultElement.classList.remove('success');
            resultElement.classList.add('info');
            resultElement.innerHTML = content;
        }
        self.showSuccess = (content) => {
            var resultElement = form.getResultElement();
            resultElement.classList.remove('error');
            resultElement.classList.remove('info');
            resultElement.classList.add('success');
            resultElement.innerHTML = content;
        }
        self.sendMessages = (recipients) => {
            self.showInfo('Messages are being sent right now.');

            var promisses = [];
            recipients.forEach((recipient) => {
                var promise = api.sendMessage(recipient, subject, content);

                promisses.push(promise);
            });
            //@TODO Promise.all(promisses)
            //.then() showSuccess
            //.then() showError
        }

        self.handleButton();

        return self;
    }
};
