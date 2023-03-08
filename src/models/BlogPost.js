'use strict';

module.exports = (sequelize, DataTypes) => {
    const BlogPost = sequelize.define('BlogPost', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        title: DataTypes.STRING,
        content: DataTypes.STRING,
        userId: {
            type: DataTypes.INTEGER,
            foreignKey: true,
        },
        published: DataTypes.DATE,
        updated: DataTypes.DATE,
    },
    {
        tableName: 'blog_posts',
        createdAt: 'published',
        updatedAt: 'updated',
        underscored: true,
    });
    BlogPost.associate = (models) => {
        BlogPost.belongsTo(models.User, {
            foreignKey: {
                name: 'userId',
                field: 'user_id'
            }, 
            as: 'user',
        })
    };
    return BlogPost;
};
