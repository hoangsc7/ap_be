const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'mysql',
  logging: false,
  pool: {
    max: 30,       // số kết nối tối đa trong pool
    min: 0,        // số kết nối tối thiểu
    acquire: 30000, // thời gian tối đa (ms) Sequelize sẽ chờ trước khi báo lỗi nếu không lấy được kết nối
    idle: 10000     // thời gian (ms) 1 kết nối có thể “nhàn rỗi” trước khi bị đóng
  }
});

module.exports = sequelize;
