function checkForSupervisor(customerID) {
  const url = 'https://apirest.3dcart.com/3dCartWebAPI/v1/Customers/' + customerID;
  const accessToken = process.env.TOKEN ? process.env.TOKEN : '87dcb88f1619747fd8398aa6731cac15';
  const privateKey = process.env.KEY ? process.env.KEY : 'be6a6060c5b8d34baff6fef2d5902529';
  let myInit = {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded',
      'SecureUrl': 'https://717418968211.3dcart.net',
      'PrivateKey': privateKey,
      'Token': accessToken,
      'cache-control': 'no-cache'
    }
  };
  fetch(url, myInit)
    .then(res => {
      if (res.ok) return res.json();
    })
    .then(json => {
      console.log(json)
      return json;
    })
	//if (customer.adminEmailField) return true;
  return false;
}

function sendEmail(address) {
	//do stuff
}

module.exports = {checkForSupervisor, sendEmail};
