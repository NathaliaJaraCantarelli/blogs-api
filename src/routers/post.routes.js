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

router.get('/', verifyAuthToken, createPostController.getPost);

router.get('/search', verifyAuthToken, createPostController.searchPost);

router.get('/:id', verifyAuthToken, createPostController.getPostId);

router.put('/:id', verifyAuthToken, verifyFields, createPostController.putPostId);

router.delete('/:id', verifyAuthToken, createPostController.deletePost);

module.exports = router;
