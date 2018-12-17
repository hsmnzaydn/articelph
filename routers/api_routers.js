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
    router.get(global.API_SECURE_USER_BASE_PATH+':id'+'/profile',userController.getProfile);
    router.put(global.API_SECURE_USER_BASE_PATH+':id'+'/profile',userController.updateUser);
    //router.get(global.API_USER_BASE_PATH+':id',userController.authorizationUser)

    //Articles Controllers
    articlesController=require('../components/articles/articles-controller')
    router.get(global.API_SECURE_ARTICLES_PATH,articlesController.getArticles)
    router.post(global.API_SECURE_ARTICLES_PATH,articlesController.createArticle)
    router.put(global.API_SECURE_ARTICLES_PATH+':id',articlesController.updateArticle)
    router.get(global.API_SECURE_ARTICLES_PATH+':id',articlesController.getArticle)

    //Categories Controllers
    categoryController=require('../components/categories/categories-contoller')//TODO: Init the contoller
    router.get(global.API_SECURE_CATEGORIES_PATH,categoryController.getCategories)
    router.get(global.API_SECURE_CATEGORIES_PATH+':id'+global.API_ARTICLES_BASE_PATH,categoryController.getCategoryArticles);

    //Languages Controller
    languageController=require('../components/languages/language-controller')//TODO: Init the controller
    router.get(global.API_SECURE_LANGUAGES_PATH,languageController.getLanguages)
    router.get(global.API_SECURE_LANGUAGES_PATH+':id'+global.API_ARTICLES_BASE_PATH,languageController.getLanguageArticles)

    //Links Controller
    linksController=require('../components/links/links-controller')//TODO: Init the controller
    router.get(global.API_SECURE_LINKS_PATH,linksController.getLinks)



      

module.exports=router;      