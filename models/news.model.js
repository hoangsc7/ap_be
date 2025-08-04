const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');

const News = sequelize.define('news', {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    img: {
        type: DataTypes.STRING,
    },
    content: {
        type: DataTypes.TEXT,
    },
    html: {
        type: DataTypes.TEXT,
    },
    json: {
        type: DataTypes.JSON,
    }
});

module.exports = News;
