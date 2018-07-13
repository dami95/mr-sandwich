window.App = {
    init: () => {
        var api = Api.init();
        var form = Form.init();
        var list = List.init(api);
        var message = Message.init(api, form, list);
    }
};

document.addEventListener('DOMContentLoaded', App.init);