require('dotenv').load();

function checkForSupervisor(customerID, callback) {
  const http = require("https");
  const options = {
    "method": "GET",
    "hostname": "apirest.3dcart.com",
    "port": null,
    "path": "/3dCartWebAPI/v1/Customers/" + customerID,
    "headers": {
      "accept": "application/json",
      "content-type": "application/json;charset=UTF-8",
      "secureurl": "https://aspenmills-com.3dcartstores.com/",
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
      if (body && !!body.toString()) {
        const user = JSON.parse(body.toString())[0];
        return callback(user.AdditionalField1);
      }
  });
});

req.end();
}

function approvalNeeded(address, orderInfo) {
  //update order status to Awaiting Approval / On Hold
  updateOrderStatus(orderInfo.OrderID, 6);
  //send approval email
	if (address) {
    const EmailTemplate = require('email-templates').EmailTemplate
    const path = require('path')

    const templateDir = path.join(__dirname, 'templates', 'approval')

    const htmlTemplate = new EmailTemplate(templateDir);

    const nodemailer = require('nodemailer');

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      service: 'mailgun',
   auth: {
       user: process.env.MAIL_USER,
       pass: process.env.MAIL_PASS
   }
    });

    htmlTemplate.render(orderInfo, function (err, result) {
      let mailOptions = {
        from: '"Aspen Mills" <orders@aspenmills.com>',
        to: address, // list of receivers
        subject: 'Approval Needed - Order #' + orderInfo.InvoiceNumberPrefix + orderInfo.InvoiceNumber,
        text: result.text,
        html: result.html
      };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          return console.log(error);
      }
      console.log('Message %s sent: %s', info.messageId, info.response);
      });

    })

    //make PUT request to keep the order in Awaiting Approval(8) status until approval, then either Processing(2) or Denied(9)

  }
  else return false;
}

function updateOrderStatus(orderID, status, callback) {
  const http = require("https");
  const options = {
    "method": "PUT",
    "hostname": "apirest.3dcart.com",
    "port": null,
    "path": "/3dCartWebAPI/v1/Orders/" + orderID,
    "json": {
      "headers": {
        "accept": "application/json",
        "content-type": "application/json;charset=UTF-8",
        "secureurl": "https://aspenmills-com.3dcartstores.com/",
        "token": process.env.TOKEN,
        "privatekey": process.env.KEY,
        "cache-control": "no-cache",
      },
      "OrderStatusID": status
    }
  };

  const req = http.request(options, function (res) {
    console.log(res)
  });

req.end();
}

module.exports = {checkForSupervisor, approvalNeeded, updateOrderStatus};
