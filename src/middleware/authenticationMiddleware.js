// middlewares/authenticationMiddleware.js
const { verifyToken } = require('../services/authService');

function authenticationMiddleware(req, res, next) {
    if (req.headers.authorization === undefined || req.headers.authorization.split(' ')[0] !== 'Bearer') {
        const status = 401;
        const message = 'Token inválido';
        res.status(status).json({ status, message });
        return;
    }

    try {
        const verifyTokenResult = verifyToken(req.headers.authorization.split(' ')[1]);

        if (verifyTokenResult instanceof Error) {
            const status = 401;
            const message = 'Token de autenticação não encontrado';
            res.status(status).json({ status, message });
            return;
        }
        next();
    } catch (err) {
        const status = 401;
        const message = 'Token revogado';
        res.status(status).json({ status, message });
    }
}

module.exports = authenticationMiddleware;
