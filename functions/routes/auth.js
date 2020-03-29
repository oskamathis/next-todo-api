const admin = require('./admin.js');
const db = admin.firestore();
const crypto = require('./crypto.js');


module.exports.getUserId = (req) => {
    if (
        req.headers.authorization
        && req.headers.authorization.split(' ')[0] === 'Bearer'
    ) {
        let token = req.headers.authorization.split(' ')[1];
        return crypto.getDecryptedString(token);
    }
}
