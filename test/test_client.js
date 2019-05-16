const request = require('request')
const fs = require('fs')

// Test getIndex

request('https://us-central1-realstack-e4286.cloudfunctions.net/getIndex', function (error, response, body) {
  if (!error && response.statusCode == 200) {
    console.log(body);
  }
});


// Test getFake
function callback(error, response, body) {
  if (!error && response.statusCode == 200) {
  	console.log(response.headers)
  	console.log(typeof(body))
    fs.writeFile("/tmp/out.pdf", body, function(err) {
    	return console.log(err)
    });
  } else {
  	console.log(response.statusCode)
  	console.log(error)
  }
}

request.post({
	headers: {'Content-Type': 'application/json'},
	url: 'https://us-central1-realstack-e4286.cloudfunctions.net/getFake',
	body: '{"book_code": "real_book_1_6thEd_C", "fake_code": "autumn_leaves"}', 
	encoding: null,
}, callback);



