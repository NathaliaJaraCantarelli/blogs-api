const express = require('express');
const { createUserController } = require('../controllers');
const { verifyUser } = require('../middlewares/verifyCreateUser');

const router = express.Router();

router.post('/', verifyUser, createUserController.createUser);

module.exports = router;
