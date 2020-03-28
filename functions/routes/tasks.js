const admin = require('firebase-admin');
admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    databaseURL: 'https://next-todo-002.firebaseio.com'
});
const db = admin.firestore();
const router = require('express-promise-router')();

/**
 * タスク取得
 */
router.get('/:id', async (req, res) => {
    let ref = db.collection('tasks').doc(req.params.id);
    let task = await ref.get().catch(err => console.log('Error getting document', err));

    if (!task.exists) {
        console.log('No such document!');
        res.status(404).send({ message: 'Not Found' });
    } else {
        console.log('Document data:', task.data());
        res.send(task.data());
    };
});

    });
});


module.exports = router
