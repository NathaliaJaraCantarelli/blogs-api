const { user, name } = require('./schemas');

const validateUser = ({ email, password, displayName, image }) => {
    const { error } = user.validate({ email, password, displayName, image });
    if (error) return { type: 'INVALID_VALUE', message: error.message };

    return { type: null, message: null };
};

const validateName = (nameCategory) => {
    const { error } = name.validate(nameCategory);
    
    if (error) return { type: 'INVALID_VALUE', message: error.message };
    
    return { type: null, message: null };
};

module.exports = {
    validateUser,
    validateName,
};
