const { createToken } = require('../auth/authFunctions');
const { userService } = require('../services');

const isBodyValid = (email, password) => email && password;

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!isBodyValid(email, password)) {
            return res.status(400).json({ message: 'Some required fields are missing' });
        }
        const user = await userService.getUserByEmail(email);
        
        if (!user || password !== user.password) {
            return res.status(400).json({ message: 'Invalid fields' });
        }

        const { password: _, ...userWithoutPassowrd } = user.dataValues;

        const token = createToken(userWithoutPassowrd);

        res.status(200).json({ token });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const createUser = async (req, res) => {
    try {
        const { email, password, displayName, image } = req.body;
        const user = await userService.getUserByEmail(email);
        if (user) {
            return res.status(409).json({ message: 'User already registered' });
        }

        const newUser = await userService.createUser({ email, password, displayName, image });
        if (newUser.type) {
            return res.status(400).json({ message: newUser.message });
        }

        const { password: _, ...userWithoutPassowrd } = newUser.dataValues;
        const token = createToken(userWithoutPassowrd);
        return res.status(201).json({ token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getUsers = async (_req, res) => {
    try {
        const users = await userService.getUsers();
        return res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await userService.getUserById(id);
        if (!user) {
            return res.status(404).json({ message: 'User does not exist' });
        }
        return res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    login,
    createUser,
    getUsers,
    getUserById,
};
