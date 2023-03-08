const express = require('express');
const { createCategoryController } = require('../controllers');
const { verifyNameCategory } = require('../middlewares/verifyNameCategory');
const { verifyAuthToken } = require('../middlewares/verifyToken');

const router = express.Router();

router.post('/', verifyAuthToken, verifyNameCategory, createCategoryController.createCategory);

module.exports = router;