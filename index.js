// index.js

const express = require('express');
const sequelize = require('./sequelize');
const app = express();
const port = 3000;
const ExampleRoutes = require('./router/ExampleRoutes');
const AuthRoutes = require('./router/AuthRoutes');
const authenticateToken = require('./middleware/authMiddleware');
require('dotenv').config(); // เพิ่มการโหลดตัวแปร .env

// Middleware สำหรับการ parse JSON bodies
app.use(express.json());

// ใช้งาน AuthRoutes สำหรับการลงทะเบียนและการเข้าสู่ระบบ
app.use('/auth', AuthRoutes);

// ใช้ authenticateToken middleware สำหรับ routes ที่ต้องการการยืนยันตัวตน
app.use(authenticateToken);

// ใช้ ExampleRoutes สำหรับ routes ที่ต้องการการยืนยันตัวตน
app.use('/', ExampleRoutes);

const server = app.listen(port, () => {
    console.log('Server is running at http://localhost:' + port);
});

// Gracefully shut down the server and close the database connection
process.on('SIGTERM', () => {
    server.close(() => {
        sequelize.close().then(() => {
            console.log('Database connection closed');
            process.exit(0);
        });
    });
});
