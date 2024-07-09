const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('db_ssw_dlt', 'swp_root', 'Password123#@!', {
    host: '10.1.112.83',
    dialect: 'mysql'
  });
module.exports = sequelize;
