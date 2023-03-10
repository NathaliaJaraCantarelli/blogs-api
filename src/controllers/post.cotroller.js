const { postService } = require('../services');
// const { findAllById } = require('../services/category.service');

const createPost = async (req, res) => {
    try {
        const { id } = req.data;
        const { type, message } = await postService.createPost(req.body, id);
        if (type) return res.status(type).json(message);
        return res.status(201).json(message);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getPost = async (_req, res) => {
    // const posts = await postService.getAll();
    // const result = await Promise.all(posts.map((post) => {
    //     post.dataValues.categories = post.dataValues.Categories;
    //     return post;
    // }))
    // return res.status(200).json(result);
    const result = await postService.getAll();
    return res.status(200).json(result);
};

module.exports = {
    createPost,
    getPost,
};
