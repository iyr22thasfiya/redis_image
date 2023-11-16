// app.js
const express = require('express');
const path = require('path');
const formRoutes = require('./routes/formRoutes.js');
const formService = require('./services/formService.js');
const redisService = require('./services/redisService.js');
const fileUpload = require("express-fileupload");


const app = express();
const port = 3000;

// Set view engine to EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware to serve static files (styles.css)
app.use(express.static(path.join(__dirname, 'public')));

// Body parsing middleware
app.use(express.urlencoded({ extended: true }));

// Use form routes
app.use('/', formRoutes);
// Start Redis Server
redisService.getRedisClient();
//for fileupload
app.use(fileUpload());

// Schedule MySQL storage every 2 minutes
setInterval(() => {
  formService.storeFormDataInMySQL();
}, 120000); // 2 minutes in milliseconds

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
