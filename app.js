const express=require('express');
      app=express();
      router=express.Router();
      
      //Swagger Configuration
      swaggerUI=require('swagger-ui-express');
      YAML = require('yamljs');
      swaggerDocument = YAML.load('./swagger/swagger_api.yaml');
      app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));  

      // Body Parser
      bodyParser=require('body-parser')
      app.use(bodyParser.urlencoded({ extended: false }))
      app.use(bodyParser.json())

      // File Upload
      path = require('path');
      app.use(express.static(path.join(__dirname, 'resources')));
      app.use(express.static(path.join(__dirname, './resources/upload')));
      fileUpload = require('express-fileupload');
      app.use(fileUpload())

      //Cors
      cors = require('cors')
      app.use(cors())

      // Process Env file
      require('dotenv').config({path: './process.env'});
      
      // Database Configuration
      mongoose = require("mongoose");
      mongoose.connect(process.env.DB_URL).then(()=>{
        console.log('MongoDB is connected')
      }).catch(err=>{
        console.error(err)
      })
      mongoose.Promise = global.Promise;
      
      // Error handling
      
      app.use(function (err, req, res, next) {
        res.status(500).send({
          code:500,
          err:err.message,
          message:'There is a problem'
        })
      })

      //Routers
      constant=require('./Utils/Constants')
      routers=require('./routers/api_routers')
      app.use(global.API_BASE_PATH,routers);  

  




app.listen(process.env.PORT)
