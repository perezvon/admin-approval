function checkForSupervisor(customerID) {
  let adminEmail = '';
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
    "token": "87dcb88f1619747fd8398aa6731cac15",
    "privatekey": "be6a6060c5b8d34baff6fef2d5902529",
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
    console.log(body.toJSON());
    if (body[0].AdditionalField1) adminEmail = body[0].AdditionalField1;
  });
});

req.end();
	if (adminEmail) return adminEmail;
  return false;
}

function sendEmail(address) {
	if (address) console.log(address)
  else return false;
}

module.exports = {checkForSupervisor, sendEmail};
