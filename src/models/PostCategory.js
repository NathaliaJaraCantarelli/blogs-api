'use strict';

module.exports = (sequelize, DataTypes) => {
    const PostCategory = sequelize.define('PostCategory', {
        postId: {
            type: DataTypes.INTEGER,
            foreignKey: true,
        },
        categoryId: {
            type: DataTypes.INTEGER,
            foreignKey: true,
        },
    },
    {
        timestamps: false,
        underscored: true,
        tableName: 'posts_categories',
    });
    PostCategory.associate = (models) => {
        models.Category.belongsToMany(models.BlogPost, {
            foreignKey: 'categoryId',
            through: PostCategory,
            otherKey: 'postId'
        });
        models.BlogPost.belongsToMany(models.Category, {
            foreignKey: 'postId',
            through: PostCategory,
            otherKey: 'categoryId'
        });
    };
    return PostCategory;
};
