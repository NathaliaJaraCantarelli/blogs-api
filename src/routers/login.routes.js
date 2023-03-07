const express = require('express');
const { createUserController } = require('../controllers');

const router = express.Router();

router.post('/', createUserController.login);

module.exports = router;
