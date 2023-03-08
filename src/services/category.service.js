const { Category } = require('../models');

const createCategory = async (name) => Category.create(name);

const findCategoryByName = async (name) => Category.findOne({ where: { name } });

const findAllCategories = async () => Category.findAll();

module.exports = {
    createCategory,
    findCategoryByName,
    findAllCategories,
};
