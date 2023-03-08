const { Category } = require('../models');

const createCategory = async (name) => Category.create(name);

const findCategoryByName = async (name) => Category.findOne({ where: { name } });

module.exports = {
    createCategory,
    findCategoryByName,
};
