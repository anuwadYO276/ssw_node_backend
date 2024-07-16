# ใช้ Node.js base image
FROM node:14

# ตั้ง working directory
WORKDIR /app

# คัดลอก package.json และ package-lock.json
COPY package*.json ./

# ติดตั้ง dependencies
RUN npm install

# อัปเดต package ใน image
RUN apt-get update

# คัดลอกไฟล์ทั้งหมดจากโปรเจ็คของคุณไปยัง image
COPY . .

# เปิด port ที่แอพจะใช้งาน
EXPOSE 3000

# คำสั่งสำหรับเริ่มต้นแอพ
CMD ["npm", "start"]
