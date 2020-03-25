const functions = require('firebase-functions');

exports.hello = functions.region('asia-northeast1').https.onRequest((requset, response) => {
    response.send('Hello World !!');
});
