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

module.exports = {
    login,
};
