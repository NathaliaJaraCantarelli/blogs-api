const express = require('express');
const { createPostController } = require('../controllers');
const { verifyAuthToken } = require('../middlewares/verifyToken');
const { verifyFields } = require('../middlewares/verifyFields');
const { verifyIdsCategories } = require('../middlewares/verifyIdsCategories');

const router = express.Router();

router.post(
    '/',
    verifyAuthToken,
    verifyFields,
    verifyIdsCategories,
    createPostController.createPost,
);

module.exports = router;
