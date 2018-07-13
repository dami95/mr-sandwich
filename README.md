# Mr Sandwich
Hello, it's simple application that can helps you with sending notification to colleagues about Mr Sandwich in your office.
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

## Frontend 
Application written using HTML, CSS and native JavaScript (using also ES6).
Document index.html is ready to run in browser without any build operations.
Frontend app is deficient - sending e-mails is not ready, adding and editing recipients is impossible.

SCSS code is divided to 4 JS files:
- _reset.scss - reset.css for resetting some browser differences
- _variables.scss - project variables - colors and heights of header and footer
- _layout.scss - SCSS code responsible for layout - for main boxes dimenstions and responsive design  
- style.scss - main css about two main parts of app - recipents list and message creation box 

JS code is divided to 5 JS files:
- app.js - main initiation file
- api.js - responsible for communication with backend
- form.js - responsible for handling form - getting values from fields, make validation
- list.js - responsible for handle recipients list - get recipients from api, draw list, handle choosing recipients to send message and in the future for editing and adding recipient
- message.js - responsible for main feature - sending e-mail - get informations from form, get information about recipients, send message and show correct messages with results

To run develop build process:
- enter frontend folder: `cd frontend`
- install nodeJS modules: `npm install`
- run compile SCSS and JS process: `gulp compile`
- run watcher that watch your scss and css files: `gulp watch`

@TODO list:   
- CRUD in recipients list and saving then to backend or localStorage
- sending real e-mails using prepared backend
- add displaying loaders in load time 
- frontend tests
- integration tests between frontend and backend 
- backend http tests - more in `backend/test/test.js`
- add jslint to gulp compile
- add es6->es5 convert (babel) to gulp compile 
- settings of app - to set api keys, domain and from (sender) via browser