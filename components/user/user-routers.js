const express=require('express');
      router=express.Router();
      userController=require('./user-controller')
      
      router.get('',userController.test)

      




module.exports=router;      