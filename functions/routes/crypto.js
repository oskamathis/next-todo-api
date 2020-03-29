const crypto = require('crypto');

const ENCRYPTION_KEY = "HH95XH7sYAbznRBJSUE9W8RQxzQIGSpy"
const BUFFER_KEY = "RfHBdAR5RJHqp5wm"
const ENCRYPT_METHOD = "aes-256-cbc"
const ENCODING = "hex"

module.exports.getEncryptedString = (raw) => {
    let iv = Buffer.from(BUFFER_KEY)
    let cipher = crypto.createCipheriv(ENCRYPT_METHOD, Buffer.from(ENCRYPTION_KEY), iv)
    let encrypted = cipher.update(raw)

    encrypted = Buffer.concat([encrypted, cipher.final()])

    return encrypted.toString(ENCODING)
}

module.exports.getDecryptedString = (encrypted) => {
    let iv = Buffer.from(BUFFER_KEY)
    let encryptedText = Buffer.from(encrypted, ENCODING)
    let decipher = crypto.createDecipheriv(ENCRYPT_METHOD, Buffer.from(ENCRYPTION_KEY), iv)
    let decrypted = decipher.update(encryptedText)

    decrypted = Buffer.concat([decrypted, decipher.final()])

    return decrypted.toString()
}
