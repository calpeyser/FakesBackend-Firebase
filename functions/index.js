const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp({
    storageBucket: "realstack-e4286.appspot.com"
});
var bucket = admin.storage().bucket();

exports.getIndex = functions.https.onRequest((request, response) => {
	const indexFile = bucket.file('index.json');
	indexFile.download(function(err, contents) {
  		response.send(new Buffer(contents));
	});
});

exports.getFake = functions
	.runWith({timeoutSeconds: '300'})
	.https.onRequest((request, response) => {
		const fakeFile = bucket.file('fakes/' + request.body.book_code + '/' + request.body.fake_code + '.pdf')
		fakeFile.download(function(err, contents) {
			console.log(err)
			console.log(contents)
			console.log("1")
			response.writeHead(200, {
 			  'Content-Type': 'application/pdf',
			  'Content-Disposition': 'attachment; filename=autumn_leaves.pdf',
			  'Content-Length': contents.length
			})
			response.write(contents)
			response.end();
		});
	});