const Sequelize = require('sequelize');
const config = require('../config/config');
const { BlogPost, PostCategory, Category, User } = require('../models');

const env = process.env.NODE_ENV || 'development';

const sequelize = new Sequelize(config[env]);

const createPost = async ({ title, content, categoryIds }, userId) => {
    const result = await sequelize.transaction(async (t) => {
        const post = await BlogPost.create({
            title,
            content,
            userId,
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

const getAll = async () => BlogPost.findAll({ include: [
        {
            model: User,
            as: 'user',
            attributes: { exclude: 'password' },
        },
        {
            model: Category,
            as: 'categories',
            through: { attributes: [] },
        },
    ],
});

const getAById = async (id) => BlogPost.findByPk(id, { include: [
    {
        model: User,
        as: 'user',
        attributes: { exclude: 'password' },
    },
    {
        model: Category,
        as: 'categories',
        through: { attributes: [] },
    },
],
});

const putPost = async (contentPost, id) => BlogPost
    .update(contentPost, { where: { id } });

module.exports = {
    createPost,
    getAll,
    putPost,
    getAById,
};
