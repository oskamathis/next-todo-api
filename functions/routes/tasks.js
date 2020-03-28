const functions = require('firebase-functions');
const cors = require('cors')({ origin: true });
const admin = require('firebase-admin');
admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    databaseURL: "https://next-todo-002.firebaseio.com"
});
const db = admin.firestore();


module.exports.show = functions.region('asia-northeast1').https.onRequest((req, res) => {
    cors(req, res, async () => {
        let ref = db.collection('tasks').doc('aJDm3esbPPlGLKseXPXp');
        let task = await ref.get().catch(err => console.log('Error getting document', err));

        if (!task.exists) {
            console.log('No such document!');
            res.status(404).send({ "message": "No such document!" });
        } else {
            console.log('Document data:', task.data());
            res.send(task.data());
        };
    });
});

