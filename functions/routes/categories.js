const admin = require('./admin.js');
const db = admin.firestore();
const router = require('express-promise-router')();
const auth = require('./auth.js');

/**
 * カテゴリ登録
 */
router.post('/', async (req, res) => {
    // let userRef = auth.getUserRef(req);
    let userId = auth.getUserId(req);
    let userRef = await db.collection('users').doc(userId);

    let addCategory = {
        'name': req.body.name
    }

    await db.collection('categories').add({ 'user': userRef, ...addCategory })
    res.send(addCategory);
});

module.exports = router;
