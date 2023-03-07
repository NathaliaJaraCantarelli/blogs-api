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
        res.status(500).json({ message: 'Erro ao salvar o usuário no banco', error: err.message });
    }
};

const createUser = async (req, res) => {
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
};

module.exports = {
    login,
    createUser,
};
