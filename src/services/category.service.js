const { Category } = require('../models');

const createCategory = async (name) => Category.create(name);

const findCategoryByName = async (name) => Category.findOne({ where: { name } });

const findAllCategories = async () => Category.findAll();

const findAllById = async (id) => Category.findAll({ where: { id } });

module.exports = {
    createCategory,
    findCategoryByName,
    findAllCategories,
    findAllById,
};
