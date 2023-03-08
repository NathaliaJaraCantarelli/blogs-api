const express = require('express');
const { createUserController } = require('../controllers');
const { verifyUser } = require('../middlewares/verifyCreateUser');
const { verifyAuthToken } = require('../middlewares/verifyToken');

const router = express.Router();

router.get('/', verifyAuthToken, createUserController.getUsers);

router.get('/:id', verifyAuthToken, createUserController.getUserById);

router.post('/', verifyUser, createUserController.createUser);

module.exports = router;
