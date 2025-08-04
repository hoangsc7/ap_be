const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');

const Admin = sequelize.define('admin', {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    }
});

module.exports = Admin;
