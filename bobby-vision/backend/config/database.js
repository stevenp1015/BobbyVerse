require('dotenv').config();

module.exports = {
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || 'bobby_vision',
  user: process.env.DB_USER || 'bobby_user',
  password: process.env.DB_PASSWORD || 'password'
};