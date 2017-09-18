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
	const orderData = req.body[0] ? req.body[0] : req.body;
	helpers.checkForSupervisor(orderData.CustomerID, adminEmail => {
		helpers.approvalNeeded(adminEmail, orderData);
	});
	res.end('yes');
})

app.get('/approve', (req, res) => {
	const approved = req.query.result;
	const orderID = req.query.OrderID;
	if (approved === 'true') {
		helpers.updateOrderStatus(orderID, 8)
		res.send('request approved!')
	} else {
		helpers.updateOrderStatus(orderID, 9)
		res.send('request denied.')
	}
	//
})

app.listen(port, function() {
    console.log('App listening on port ' + port);
});
