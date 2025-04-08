# Sử dụng image Node.js chính thức
FROM node:18

# Đặt thư mục làm việc cho container
WORKDIR /app

# Copy package.json và package-lock.json vào container
COPY package*.json ./

# Cài đặt các dependencies
RUN npm install

# Copy toàn bộ mã nguồn vào container
COPY . .

# Cấu hình lệnh chạy container
CMD ["npx", "ts-node-dev", "--respawn", "--transpile-only", "src/index.ts"]
