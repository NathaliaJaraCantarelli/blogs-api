const { findAllById } = require('../services/category.service');

const verifyIdsCategories = async (req, res, next) => {
  const { categoryIds } = req.body;
  if (!categoryIds) {
    return res.status(400).json({ message: 'one or more "categoryIds" not found' });
  }

  const categoriesArray = await findAllById(categoryIds);
  if (categoriesArray.length !== categoryIds.length) {
    return res.status(400).json({ message: 'one or more "categoryIds" not found' });
  }

  next();
};

module.exports = {
    verifyIdsCategories,
};
