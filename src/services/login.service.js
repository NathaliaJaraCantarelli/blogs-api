const { User } = require('../models');

const getUserByEmail = async (email) => User.findOne({ where: { email } });

const createUser = async (user) => User.create(user);

const getUsers = async () => User.findAll({ attributes: { exclude: 'password' } });

const getUserById = async (id) => User.findOne({
    where: { id },
    attributes: { exclude: 'password' },
});

module.exports = {
    getUserByEmail,
    createUser,
    getUsers,
    getUserById,
};
