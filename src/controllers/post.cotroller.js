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

const getPost = async (_req, res) => {
    const posts = await postService.getAll();
    return res.status(200).json(posts);
};

const getPostId = async (req, res) => {
    const { id } = req.params;
    const posts = await postService.getAll();
    const exists = posts.find((post) => post.dataValues.id === Number(id));
    if (!exists) return res.status(404).json({ message: 'Post does not exist' });
    return res.status(200).json(exists);
};

const putPostId = async (req, res) => {
    const { id } = req.params;
    const { id: idUser } = req.data;
    const { title, content } = req.body;

    const { dataValues } = await postService.getAById(id);

    if (!dataValues) return res.status(404).json({ message: 'Post does not exist' });
    
    if (dataValues.userId !== idUser) return res.status(401).json({ message: 'Unauthorized user' });

    await postService.putPost({ title, content }, dataValues.userId);
    const updated = await postService.getAById(id);

    return res.status(200).json(updated);
};

const deletePost = async (req, res) => {
    const { id } = req.params;
    const { id: idUser } = req.data;

    const posts = await postService.getAById(id);

    if (!posts) return res.status(404).json({ message: 'Post does not exist' });
    
    if (posts.dataValues.userId !== idUser) {
        return res.status(401).json({ message: 'Unauthorized user' });
    }

    await postService.deletePost(id);
    return res.status(204).json();
};

const searchPost = async (req, res) => {
    const { q } = req.query;
    const postsSearch = await postService.searchPost(q);
    return res.status(200).json(postsSearch);
};

module.exports = {
    createPost,
    getPost,
    getPostId,
    putPostId,
    deletePost,
    searchPost,
};
