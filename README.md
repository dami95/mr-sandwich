# Mr Sandwich
Hello, it's simple application that can helps you with sending every day notification to colleagues about Mr Sandwich in your office.
It will be very helpful if you are working as office manager or on similar position.
You can easily add all workers of yours company to recipient list and you can send them e-mail information about sandwiches to buy on a reception or another place in the office.

## Backend
RestAPI written in nodeJS using express module. Backend is responsible for sending e-mails using mailgun API (https://www.mailgun.com/) and SendGrid (https://sendgrid.com/). Backend also return a information about success sending or about errors.
To run backend properly you need nodeJS (tested on version 8.9.4). 
To install backend:
- enter backend folder: `cd backend`
- install nodeJS modules: `npm install`
- prepare mailgun and sendgrid API keys 
- insert configuration using basic bash script (via cli): `echo "module.exports = {mailgun: '--MAILGUN_API_KEY--', sendgrid: '--SENDGRID_API_KEY--', port: 8000};" > modules/config.js`
- run test: `npm test`
- run backend: `npm start` to see `Backend is ready on localhost:8000`
- go to browser and open `http://localhost:8000/` site to see `Hello, backend is working!` text

