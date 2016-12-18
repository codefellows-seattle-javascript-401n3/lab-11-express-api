function parseBody(req) { //no callback param b/c it's a promise
  return new Promise((resolve, reject) => {
    if (req.method === 'POST' || req.method === 'PUT') {
      req.body = ''; //make a body property to req parameter and make it an empty string
      req.on('data', function(data) { //when data is received
        req.body += data.toString(); //take that data, add it as a value to req.bod and make it a string
      });
      req.on('end', function() { //when an end event is triggered
        try {
          req.body = JSON.parse(req.body);//turn the req.body value into JSON
          resolve(req); //Pass the req.body JSON object out of the function
        } catch (err) {
          console.error(err);
          reject(err); //need to put try catch in case it is invalid JSON.
        }
      });
      req.on('error', err => {
        console.error(err);
        reject(err);
      });
      return;
    }
    resolve(); //
  });//promise is returned when parseBody is called.
}

module.exports = parseBody;
