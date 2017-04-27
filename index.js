'use strict';

var express = require('express')
var bodyParser = require('body-parser')
const app = express()

const port = process.env.PORT || 3000;

//support parsing of application/json type post data
app.use(bodyParser.json());

//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));

app.route('/')
	.get((req, res) => res.send('Admin Approval Microservice'))


app.post('/approve', (req, res) => {
	console.log(req.body);
	res.end('yes');
})

app.listen(port, function() {
    console.log('App listening on port ' + port);
});
