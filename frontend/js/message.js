window.Message = {
    init: (form, list) => {
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
