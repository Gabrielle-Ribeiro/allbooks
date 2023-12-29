const jwt = require('jsonwebtoken');

const SECRET_KEY = '123456789';

function createToken(payload, expiresIn = '12h') {
    return jwt.sign(payload, SECRET_KEY, { expiresIn });
}

function verifyToken(token) {
    return jwt.verify(token, SECRET_KEY, (err, decode) => (decode !== undefined ? decode : err));
}

module.exports = { createToken, verifyToken };