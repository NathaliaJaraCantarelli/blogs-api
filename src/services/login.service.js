const { User } = require('../models');

const getUserByEmail = async (email) => User.findOne({ where: { email } });

const createUser = async (user) => User.create(user);

module.exports = {
    getUserByEmail,
    createUser,
};
