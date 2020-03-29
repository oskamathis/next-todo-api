const admin = require('./admin.js');
const db = admin.firestore();
const router = require('express-promise-router')();
const auth = require('./auth.js');

/**
 * カテゴリ登録
 */
router.post('/', async (req, res) => {
    let userId = auth.getUserId(req);

    let addCategory = {
        'name': req.body.name
    }

    await db.collection('categories').add({ 'user_id': userId, ...addCategory })
    res.send(addCategory);
});

/**
 * カテゴリ一覧取得
 */
router.get('/', async (req, res) => {
    let userId = auth.getUserId(req);
    let categories = [];
    await db.collection('categories').where('user_id', '==', userId).get().then(snapshot => {
        if (snapshot.empty) {
            console.log('No matching documents.');
            return;
        }

        snapshot.forEach(doc => {
            console.log(doc.id, '=>', doc.data());
            categories.push({
                'id': doc.id,
                'name': doc.data().name
            });
        })
    });

    res.send(categories);
});

/**
 * カテゴリ削除
 */
router.delete('/:id', async (req, res) => {
    await db.collection('categories').doc(req.params.id).delete();

    res.send({
        'message': 'Successfully deleted category.'
    });
});


module.exports = router;
