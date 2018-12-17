var express = require('express')
    router = express.Router();
    constant=require('../Utils/Constants')

    
    // Logger
    loggerController=require('../controller/logger')
    router.use(loggerController.logger)

    // Interceptor
    intercepter=require('../controller/interceptor')
    router.use(global.API_SECURE_BASE_PATH,intercepter.interceptor)  
    
    // Startapplication Controllers
    startApplicationController=require('../controller/start-application') 
    router.get(global.APT_SECURE_START_APPLICATION,startApplicationController.startApplication)

    //User Controllers
    userController=require('../components/user/user-controller')
    router.post(global.API_USER_BASE_PATH,userController.registerUser);
    router.get(global.API_SECURE_USER_BASE_PATH+'/'+':id'+'/profile',userController.getProfile);
    router.put(global.API_SECURE_USER_BASE_PATH+'/'+':id'+'/profile',userController.updateUser);


    //Articles Controllers
    articlesController=require('../components/articles/articles-controller')
    router.get(global.API_SECURE_ARTICLES_PATH,articlesController.getArticles)
    router.post(global.API_SECURE_ARTICLES_PATH,articlesController.createArticle)




      

module.exports=router;      