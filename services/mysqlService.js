// services/mysqlService.js
const mysql = require('mysql');
require('dotenv').config();
const db = mysql.createConnection({
  host: 'localhost',
  user: process.env.DB_USERNAME,
  password: '',
  database: process.env.DATABASE,
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
  } else {
    console.log('Connected to MySQL');
  }
});

module.exports = {
  storeFormData: (formData) => {
    const { name, image, description } = formData;
    const sql = 'INSERT INTO tbl_product (product_name, product_image, description) VALUES (?, ?, ?)';
    const values = [name, image, description];

    db.query(sql, values, (err) => {
      if (err) throw err;
      console.log('Form data stored in MySQL');
    });
  },
};
