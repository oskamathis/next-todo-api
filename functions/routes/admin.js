const admin = require('firebase-admin');
admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    databaseURL: 'https://next-todo-002.firebaseio.com'
});
module.exports = admin;
