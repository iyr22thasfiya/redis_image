// routes/formRoutes.js
const express = require('express');
const router = express.Router();
const formController = require('../controllers/formController.js');
const multer = require('multer');

// Set up Multer for handling file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.get('/', formController.getForm);
router.post('/submit', upload.single('image'), formController.submitForm);

module.exports = router;
