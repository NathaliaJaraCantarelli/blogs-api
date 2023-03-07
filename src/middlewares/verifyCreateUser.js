const { validateUser } = require('../services/validations/validationsLogin');

const verifyUser = async (req, res, next) => {
    const { email, password, displayName, image } = req.body;
    const error = validateUser({ email, password, displayName, image });
    if (error.type) return res.status(400).json({ message: error.message });
    next();
};

module.exports = {
    verifyUser,
};
