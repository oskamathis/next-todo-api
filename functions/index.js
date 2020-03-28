const express = require('express');
const app = express();
const cors = require('cors');
const functions = require('firebase-functions');

app.use(cors({ origin: true }));
app.use('/tasks', require('./routes/tasks.js'));

module.exports.api = functions.region('asia-northeast1').https.onRequest(app);
