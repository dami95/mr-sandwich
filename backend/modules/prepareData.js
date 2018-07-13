module.exports = (data) => {
    let dataToSend = {};
    let fields = ['from', 'to', 'cc', 'bcc', 'subject', 'text', 'html'];

    fields.forEach((element, index, array) => {
       if (data[element]) {
           dataToSend[element] = data[element];
       }
    });

    return dataToSend;
};