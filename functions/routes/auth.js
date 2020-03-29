const admin = require('./admin.js');
const db = admin.firestore();
const router = require('express-promise-router')();

/**
 * ユーザ作成
 */
router.post('/regist', async (req, res) => {
    let createUser = {
        'email': req.body.email,
        'password': req.body.password
    }
    let userRecord = await admin.auth().createUser(createUser)
        .catch(error => {
            console.log('Error creating new user:', error);
            res.status(409).send({'message': 'Already exists user.'});
        });

    console.log('Successfully created new user:', userRecord.uid);

    let token = await admin.auth().createCustomToken(userRecord.uid);
    res.send({ 'token': token })
});


/**
 * デバッグ用
 */
router.get('/users/:uid', async (req, res) => {
    let userRecord = await admin.auth().getUser(req.params.uid)
    res.send({ userRecord });
    // let token = await admin.auth().createCustomToken(req.params.uid);
    // res.send({ 'token': token })
});

module.exports = router;
