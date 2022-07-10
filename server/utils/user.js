const jwt = require('jsonwebtoken');

exports.createToken = (userId, isAdmin) => {
    const tokenSecret = process.env.TOKEN_SECRET;
    const token = jwt.sign({ userId, isAdmin }, tokenSecret, { expiresIn: '3d' });

    return token;
}

