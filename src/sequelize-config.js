require('dotenv').config();

module.exports = {
   dialect: 'mysql',
   host: 'localhost',
   port: 3306,
   username: process.env.DB_USERNAME,
   password: process.env.DB_PASSWORD,
   database: process.env.DB_DATABASE,
   timezone: "-04:00"
}