module.exports = (data) => {
    let dataToSend = {};
    let fields = ['from', 'to', 'cc', 'bcc', 'subject', 'text', 'html'];

    fields.forEach((element, index, array) => {
       if (data[element]) {
           dataToSend[element] = data[element];
       }
    });

    //@TODO we can also verify that in fields: to, cc, bcc are correct e-mail addresses

    return dataToSend;
};