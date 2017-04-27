function checkForSupervisor(customerID) {
  var http = require("https");

var options = {
  "method": "GET",
  "hostname": "apirest.3dcart.com",
  "port": null,
  "path": "/3dCartWebAPI/v1/Customers/2",
  "headers": {
    "accept": "application/json",
    "content-type": "application/json;charset=UTF-8",
    "secureurl": "https://717418968211.3dcart.net",
    "token": "87dcb88f1619747fd8398aa6731cac15",
    "privatekey": "be6a6060c5b8d34baff6fef2d5902529",
    "cache-control": "no-cache"
  }
};

var req = http.request(options, function (res) {
  var chunks = [];

  res.on("data", function (chunk) {
    chunks.push(chunk);
  });

  res.on("end", function () {
    var body = Buffer.concat(chunks);
    console.log(body.toString());
  });
});

req.end();
	//if (customer.adminEmailField) return true;
  return false;
}

function sendEmail(address) {
	//do stuff
}

module.exports = {checkForSupervisor, sendEmail};
