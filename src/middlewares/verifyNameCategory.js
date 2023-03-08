const { validateName } = require('../services/validations/validationsLogin');

const verifyNameCategory = async (req, res, next) => {
    const { name } = req.body;
    const error = validateName({ name });
    
    if (error.type) return res.status(400).json({ message: error.message });
    next();
};

module.exports = {
    verifyNameCategory,
};
