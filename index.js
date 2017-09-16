'use strict';

var express = require('express')
var bodyParser = require('body-parser')

var helpers = require('./globalHelpers.js')

const app = express()

const port = process.env.PORT || 3000;

//support parsing of application/json type post data
app.use(bodyParser.json());

//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => res.send('Admin Approval Microservice'))

app.post('/', (req, res) => {
	console.log(req.body)
	helpers.checkForSupervisor(req.body[0].CustomerID, adminEmail => {
		console.log(adminEmail)
		helpers.approvalNeeded(adminEmail, req.body[0]);
	});
	res.end('yes');
})

app.post('/approve', (req, res) => {
	//mark order as approved
})

app.listen(port, function() {
    console.log('App listening on port ' + port);
});
