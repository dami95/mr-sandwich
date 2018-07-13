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