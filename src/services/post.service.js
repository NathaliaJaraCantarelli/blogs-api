const Sequelize = require('sequelize');
const config = require('../config/config');
const { BlogPost, PostCategory } = require('../models');

const env = process.env.NODE_ENV || 'development';

const sequelize = new Sequelize(config[env]);

const createPost = async ({ title, content, categoryIds }) => {
    const result = await sequelize.transaction(async (t) => {
        const post = await BlogPost.create({
            title,
            content,
            userId: 1,
            updated: Date.now(),
            published: Date.now(),
        },
        { transaction: t });
        const { id } = post.dataValues;
        await Promise.all(categoryIds.map((categoryId) => PostCategory
            .create({ postId: id, categoryId },
            { transaction: t })));
        return post;
    });
    return { type: null, message: result };
};

module.exports = {
    createPost,
};
