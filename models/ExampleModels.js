const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');

const ExampleModels = sequelize.define('ExampleModels', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.STRING
    // allowNull สามารถตั้งค่าได้ตามต้องการ
  },
  date_update: {
    type: DataTypes.DATE
  }
}, {
  tableName: 'example_api', // ชื่อตารางในฐานข้อมูล
  timestamps: false // ไม่ต้องเพิ่ม timestamps fields (createdAt, updatedAt)
});

module.exports = ExampleModels;
