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