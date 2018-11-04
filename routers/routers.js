var express = require('express')
    router = express.Router();
    constant=require('../Utils/Constants')
    apiRouter= require('./api_routers')
    loggerController=require('../controller/logger')
     
    
    // Logger
    router.use(loggerController.logger)
    // Api Routers
    router.use(global.API_BASE_PATH,apiRouter);  
        

      

module.exports=router;      