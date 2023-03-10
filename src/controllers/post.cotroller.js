const { postService } = require('../services');

const categories = (posts) => {
    const result = posts.map((post) => {
        const { dataValues } = post;
        dataValues.categories = dataValues.Categories;
        return post;
    });
    return result;
};

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
    const posts = await postService.getAll();
    const result = categories(posts);
    return res.status(200).json(result);
};

const getPostId = async (req, res) => {
    const { id } = req.params;
    const posts = await postService.getAll();
    const exists = posts.find((post) => post.dataValues.id === Number(id));
    if (!exists) return res.status(404).json({ message: 'Post does not exist' });
    const [result] = categories(posts);
    return res.status(200).json(result);
};

module.exports = {
    createPost,
    getPost,
    getPostId,
};
