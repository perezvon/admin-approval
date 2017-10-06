'use strict';

const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const helpers = require('./globalHelpers.js')

const app = express()

app.use(express.static(path.resolve(__dirname)))

const port = process.env.PORT || 3000;

//support parsing of application/json type post data
app.use(bodyParser.json());

//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => res.send('Admin Approval Microservice'))

app.post('/', (req, res) => {
	console.log(req.body)
	const orderData = req.body[0] ? req.body[0] : req.body;
	//check for supervisor function not currently needed; using static env variable QM_EMAIL to send approve/deny
	//helpers.checkForSupervisor(orderData.CustomerID, adminEmail => {
		helpers.approvalNeeded(process.env.QM_EMAIL, orderData);
	//});
	res.end('yes');
})

app.get('/approve', (req, res) => {
	const approved = req.query.result;
	const orderID = req.query.OrderID;
	if (approved === 'true') {
		helpers.updateOrderStatus(orderID, 8)
		res.send('request approved!')
	} else {
		//helpers.updateOrderStatus(orderID, 9)
		res.sendFile(path.join(__dirname + '/deny.html'));
		//helpers.sendEmail(address, 'denied')
	}
})
app.post('/approve', (req, res) => {
	const comment = req.body.comment
	const address = req.body.email
	const OrderID = req.body.orderID
	const orderNumber = req.body.orderNumber
	helpers.getOrderInfo(OrderID, order => {
		order.comment = comment
		const options = {
			from: '"Aspen Mills" <orders@aspenmills.com>',
			to: address, // list of receivers
			subject: 'Order Denied - Order #' + orderNumber
		}
			helpers.updateOrderStatus(OrderID, 9)
			helpers.sendEmail(address, options, order, 'denied')
			res.send('request denied.')
	})

})

app.listen(port, function() {
    console.log('App listening on port ' + port);
});
