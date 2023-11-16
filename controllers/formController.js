// controllers/formController.js
const formService = require('../services/formService.js');

exports.getForm = (req, res) => {
  res.render('index');
};

exports.submitForm = (req, res) => {
  formService.submitForm(req, res);
};
