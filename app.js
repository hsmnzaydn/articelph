const express=require('express');
      app=express();
      
      //Swagger Configuration
      swaggerUI=require('swagger-ui-express');
      YAML = require('yamljs');
      swaggerDocument = YAML.load('./swagger/swagger_api.yaml');
      app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));  

      // Body Parser
      bodyParser=require('body-parser')
      app.use(bodyParser.urlencoded({ extended: false }))
      app.use(bodyParser.json())

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
      app.use(function(err,req,res,next){
        res.send({
          code:500,
          message:"Error"
        })
      })


      //Routers
      routers=require('./routers/routers')
    
      app.use('/',routers) 

  




app.listen(process.env.PORT)
