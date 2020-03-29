const admin = require('./admin.js');
const db = admin.firestore();
const router = require('express-promise-router')();
const bcrypt = require('bcrypt');
const crypto = require('./crypto.js');

/**
 * ユーザ登録
 */
router.post('/', async (req, res) => {
    let email = req.body.email
    let hashed_password = bcrypt.hashSync(req.body.password, 10);

    let addUser = { 'password': hashed_password }
    await db.collection('users').doc(email).create(addUser)
        .catch(error => {
            console.log('Error creating new user:', error);
            res.status(409).send({'message': 'Already exists user.'});
        });
    res.send({ 'email': email });
});

/**
 * トークン発行
 */
router.post('/login', async (req, res) => {
    let email = req.body.email;
    let password = req.body.password;

    let user = await db.collection('users').doc(email).get();
    if (!user.exists) {
        console.log('No such document!');
        res.status(401).send({ 'message': 'Unauthorized' });
    }

    if (bcrypt.compareSync(password, user.data().password)) {
        let token = crypto.getEncryptedString(email);
        res.send({ 'token': token });
    } else {
        res.status(401).send({'message': 'Unauthorized'});
    }
});

module.exports = router;
