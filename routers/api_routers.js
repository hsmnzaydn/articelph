const express = require('express')
      router = express.Router();
      Constant=require('../Utils/Constants')
      
      // Indicator
      intercepter=require('../controller/interceptor')
      router.all(global.API_SECURE_BASE_PATH,intercepter.intercepter)    
      
      // Articles Router
      articlesRouter=require('../components/articles/articles_router')
      router.use(global.API_SECURE_BASE_PATH+global.APT_ARTICLES_PATH,articlesRouter)

      // Categories Router
      categoriesRouter=require('../components/categories/categories_router')
      router.use(global.API_SECURE_BASE_PATH+global.API_CATEGORIES_PATH,categoriesRouter)
      
      // Languages Router
      languagesRouter=require('../components/languages/languages_router')
      router.use(global.API_SECURE_BASE_PATH+global.API_LANGUAGES_PATH,languagesRouter)

      // Links Router
      linksRouter=require('../components/links/links_router')
      router.use(global.API_SECURE_BASE_PATH+global.API_LINKS_PATH,linksRouter)

      // User Router
      userRouter=require('../components/user/user-routers');
      router.use(global.API_SECURE_BASE_PATH+global.API_USER_BASE_PATH,userRouter)
      
module.exports=router;      