const jwt = require('jsonwebtoken');

const SECRET_KEY = process.env.SECRET_KEY;

function verifyToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Token missing', status: 401 });
    }

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) {
            if (err.name === 'TokenExpiredError') {
                return res.status(403).json({
                    message: "Token expired",
                    status: 403,
                    type: 'TOKEN_EXPIRED'
                });
            } else {
                return res.status(401).json({
                    message: 'Invalid authorization token',
                    status: 401,
                    type: 'TOKEN_INVALID'
                });
            }
        }
        req.user = user;
        next();
    });
}

module.exports = verifyToken;
