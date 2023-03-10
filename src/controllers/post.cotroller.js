const { postService } = require('../services');

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

module.exports = {
    createPost,
};
