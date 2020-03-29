const express = require('express');
const app = express();
const cors = require('cors');
const functions = require('firebase-functions');

app.use(cors({ origin: true }));
app.use('/users', require('./routes/users.js'));
app.use('/tasks', require('./routes/tasks.js'));
app.use('/categories', require('./routes/categories.js'));

module.exports.api = functions.region('asia-northeast1').https.onRequest(app);
