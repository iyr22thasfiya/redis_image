// services/formService.js
const redisService = require('./redisService.js');
const mysqlService = require('./mysqlService.js');
const formDataModel = require('../models/formDataModel.js');
const path = require("path");
const fs = require("fs");

const formService = {
  submitForm: (req, res) => {
    const { name, description } = req.body;
    const image = req.file.buffer.toString('base64');
    if(req.file){
      
      var file = req.file;
      var file_name = file.originalname;
      const varpath = path.dirname(require.main.filename) + "\\public\\images\\" + file_name;
      //console.log(path.dirname(require.main.filename) );
      fs.writeFile(varpath, req.file.buffer, 'ascii', function(err) {
        if(err){
          res.send(err);
        }
        else{
          console.log('file Uploaded');
        }
      });
      
    }

    // Create a formData object using the model
    const formData = formDataModel(name, image, description);

    // Store form data in Redis
    redisService.setFormData(formData);

    res.send('Data saved successfully');
  },

  storeFormDataInMySQL: () => {
    redisService.getFormData((formData) => {
      if (formData) {
        // Store data in MySQL
        mysqlService.storeFormData(formData);

        // Clear Redis cache
        redisService.clearFormData();
      }
    });
  },
};

module.exports = formService;
