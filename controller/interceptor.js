userSchema = require('../components/user/model/user_model');
installedApplicationSchema = require('../components/user/model/installed_application_model');
constant = require('../Utils/Constants')



module.exports = {
    interceptor
};

async function interceptor(req,res,next) {
    installedApplicationSchema.find({udid:req.headers['udid'],_id:req.headers['authorizationkey']},function (err,installedApplicationList) {
        if(err){
            res.status(global.ERROR_CODE);
            res.send({
                code:global.ERROR_CODE,
                message:global.ERROR_MESSAGE
            })
        }else if(installedApplicationList.length==0){
            res.status(global.UNREGISTER_CODE);
            res.send({
                code:global.UNREGISTER_CODE,
                message:global.UNREGISTER_MESSAGE
            })
        }else {
            res.userId=installedApplicationList[0].user._id;
            next();

        }
    });
}

