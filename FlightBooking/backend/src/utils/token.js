const jwt = require("jsonwebtoken");

exports.createAccessToken = (user) => {
    return jwt.sign(
        { id: user.id, username: user.username, role: user.role },
        process.env.SECRET_KEY,
        { expiresIn: "1m" }
    );
};

exports.createRefreshToken = (user) => {
    return jwt.sign(
        { id: user.id },
        process.env.REFRESH_KEY,
        { expiresIn: "7d" }
    );
};
