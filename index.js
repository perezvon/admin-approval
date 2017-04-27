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
	const adminEmail = helpers.checkForSupervisor(req.body[0].CustomerID, function(x) {return x;}))
	console.log('adminEmail: ' + adminEmail);
	//helpers.sendEmail(adminEmail);
	res.end('yes');
})

app.listen(port, function() {
    console.log('App listening on port ' + port);
});
