const admin = require('firebase-admin');
admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    databaseURL: 'https://next-todo-002.firebaseio.com'
});
const db = admin.firestore();
const router = require('express-promise-router')();

/**
 * タスク登録
 */
router.post('/', async (req, res) => {
    let addTask = {
        'title': req.body.title,
        'category': req.body.category,
        'limit': req.body.limit,
        'detail': req.body.detail,
        'created_at': new Date().toISOString()
    }
    let ref = await db.collection('tasks').add(addTask)
    res.send({
        'id': ref.id,
        ...addTask
    });
});

/**
 * タスク取得
 */
router.get('/:id', async (req, res) => {
    let ref = db.collection('tasks').doc(req.params.id);
    let task = await ref.get().catch(err => {
        console.log('Error getting document', err)
    });

    if (!task.exists) {
        console.log('No such document!');
        res.status(404).send({ 'message': 'Not Found' });
    } else {
        console.log('Document data:', task.data());
        res.send(task.data());
    };
});

/**
 * タスク一覧取得
 */
router.get('/', async (req, res) => {
    let ref = db.collection('tasks');
    let tasks = [];
    await ref.get().then(snapshot => {
        if (snapshot.empty) {
            console.log('No matching documents.');
            return;
        }

        snapshot.forEach(doc => {
            console.log(doc.id, '=>', doc.data());
            tasks.push({
                'id': doc.id,
                ...doc.data()
            });
        })
    }).catch(err => {
        console.log('Error getting documents', err);
    });

    res.send(tasks);
});

/**
 * タスク更新
 */
router.patch('/:id', async (req, res) => {
    let updateTask = {
        'title': req.body.title,
        'category': req.body.category,
        'limit': req.body.limit,
        'detail': req.body.detail
    }
    let ref = await db.collection('tasks').doc(req.param.id).update(updateTask)
    res.send({
        'id': ref.id,
        ...addTask
    });
});

/**
 * タスク削除
 */
router.delete('/:id', (req, res) => {
    db.collection('tasks').doc(req.params.id).delete();

    res.send({
        'message': 'Task deletion succeeded.'
    });
});



module.exports = router;
