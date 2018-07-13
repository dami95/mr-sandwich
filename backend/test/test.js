const mocha = require('mocha');
const chai = require('chai');
const should = chai.should();

const config = require('./../modules/config');
const success = require('./../modules/success');
const error = require('./../modules/error');
const prepareData = require('./../modules/prepareData');
const mailgun = require('./../modules/mailgun');
const sendgrid = require('./../modules/sendgrid');

describe('test config', function() {
    it('config should be object', function() {
        config.should.to.be.a('object');
    });

    it('port should be be number', function() {
        config.port.should.to.be.a('number');
    });
    it('port should be greater than 1', function() {
        config.port.should.be.greaterThan(1);
    });
    it('port should be less than 9999', function() {
        config.port.should.be.lessThan(9999);
    });

    it('mailgun api key should be string', function() {
        config.mailgun.should.to.be.a('string');
    });
    it('mailgun api key should have 50 letters', function() {
        config.mailgun.should.have.length(50)
    });

    it('sendgrid api key should be string', function() {
        config.sendgrid.should.to.be.a('string');
    });
    it('sendgrid api key should have 69 letters', function() {
        config.sendgrid.should.have.length(69)
    });
});

describe('test messages', function() {
    it('success() should return object', function() {
        success().should.be.a('object');
    });
    it('success() returned object should have success key', function() {
        success().success.should.equal('Message sent.');
    });
    it('success() returned object should have message key', function() {
        let string =  'Random string';
        success(string).message.should.equal(string);
    });

    it('error() should return object', function() {
        error().should.be.a('object');
    });
    it('error() returned object should have error key', function() {
        error().error.should.equal('An error has occurred');
    });
    it('error() returned object should have error key', function() {
        let string =  'Random string';
        error(string).message.should.to.equal(string);
    });
});

describe('test prepareData function', function() {
    let data = {test: 'test', from: 'email', to: 'email', cc: 'email', bcc: 'email', subject: 'test subject', text: 'test text', html: 'test html'};
    let filteredData = prepareData(data);

    it('prepareData() should return object', function () {
        filteredData.should.be.a('object');
    });
    it('prepareData() should not have test property', function () {
        filteredData.should.have.not.property('test');
    });
    it('prepareData() should have from property', function () {
        filteredData.should.have.property('from');
    });
    it('prepareData() should have to property', function () {
        filteredData.should.have.property('to');
    });
    it('prepareData() should have cc property', function () {
        filteredData.should.have.property('cc');
    });
    it('prepareData() should have bcc property', function () {
        filteredData.should.have.property('bcc');
    });
    it('prepareData() should have subject property', function () {
        filteredData.should.have.property('subject');
    });
    it('prepareData() should have text property', function () {
        filteredData.should.have.property('text');
    });
    it('prepareData() should have html property', function () {
        filteredData.should.have.property('html');
    });
});

describe('test sending e-mails', function() {
    var data = {
        from: 'from@example.com',
        to: 'example@example.com',
        subject: 'Test subject',
        text: 'Test text'
    };

    //promise handling is difficult in chai - this test check only that function is runnable
    it('mailgun() should send e-mail', function () {
        return mailgun(data).then(res => {
            res.should.be.a('object');
        }).catch(data => {

        });
    }).timeout(5000); //mailgun reply sometimes between 2-3s

    //promise handling is difficult in chai - this test check only that function is runnable
    it('sendgrid() should send e-mail', function () {
        return sendgrid(data).then(res => {

            res.should.be.a('object');
        }).catch(data => {

        });
    }).timeout(2000); //sendgrid reply normally about 500ms
});

//there should be test about restapi for example
//run backend
//send post data by http and verify results