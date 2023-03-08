const { categoryService } = require('../services');

const createCategory = async (req, res) => {
    try {
        const { name } = req.body;
        await categoryService.createCategory({ name });
        const newCategory = await categoryService.findCategoryByName(name);
        return res.status(201).json(newCategory);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const findAllCategories = async (req, res) => {
    try {
        const categories = await categoryService.findAllCategories();
        return res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createCategory,
    findAllCategories,
};
