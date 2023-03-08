const { verifyToken } = require('../auth/authFunctions');

const verifyAuthToken = async (req, res, next) => {
    try {
        const Authorization = req.header('Authorization');
        if (!Authorization) return res.status(401).json({ message: 'Token not found' });

        const token = verifyToken(Authorization);
        req.data = token.data;

        next();
    } catch (error) {
        res.status(401).json({ message: 'Expired or invalid token' });
    }
};

module.exports = {
    verifyAuthToken,
};
