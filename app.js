const express=require('express');
      app=express();
      
      //Swagger Configuration
      swaggerUI=require('swagger-ui-express');
      YAML = require('yamljs');
      swaggerDocument = YAML.load('./swagger/swagger_api.yaml');
      app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));  

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
      
      // Body Parser
      bodyParser=require('body-parser')
      app.use(bodyParser.urlencoded({ extended: true }));

      //Routers
      routers=require('./routers/routers')
    
      app.use('/',routers) 

  




app.listen(process.env.PORT)
