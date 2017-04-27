function checkForSupervisor(customerID, callback) {
  const http = require("https");
  const options = {
  "method": "GET",
  "hostname": "apirest.3dcart.com",
  "port": null,
  "path": "/3dCartWebAPI/v1/Customers/2",
  "headers": {
    "accept": "application/json",
    "content-type": "application/json;charset=UTF-8",
    "secureurl": "https://717418968211.3dcart.net",
    "token": process.env.TOKEN,
    "privatekey": process.env.KEY,
    "cache-control": "no-cache"
  }
};

  const req = http.request(options, function (res) {
  let chunks = [];

  res.on("data", function (chunk) {
    chunks.push(chunk);
  });

  res.on("end", function () {
    var body = Buffer.concat(chunks);
    const user = JSON.parse(body.toString())[0];
    return callback(user.AdditionalField1);
  });
});

req.end();
}

function sendEmail(address) {
	if (address) {
    const nodemailer = require('nodemailer');

// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
  streamTransport: true
});

// setup email data with unicode symbols
let mailOptions = {
  from: '"Fred Foo 👻" <foo@blurdybloop.com>', // sender address
  to: address, // list of receivers
  subject: 'Hello ✔', // Subject line
  text: 'Hello world ?', // plain text body
  html: '<b>Hello world ?</b>' // html body
};

// send mail with defined transport object
transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
      return console.log(error);
  }
  console.log('Message %s sent: %s', info.messageId, info.envelope);
});
  }
  else return false;
}

module.exports = {checkForSupervisor, sendEmail};
