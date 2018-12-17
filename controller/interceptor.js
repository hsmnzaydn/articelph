userSchema = require('../components/user/model/user_model');
installedApplicationSchema = require('../components/user/model/installed_application_model');
constant = require('../Utils/Constants')
userEnums=require('../components/user/enums')



module.exports = {
    interceptor
};

async function interceptor(req, res, next) {
    installedApplicationSchema.findOne({
        udid: req.headers['udid'],
        _id: req.headers['authorizationkey']
    }).
    populate({
        path: 'user'
    }).
    then(installedApplication => {
        if (installedApplication == null) {
            res.status(global.UNREGISTER_CODE);
            res.send({
                code: global.UNREGISTER_CODE,
                message: global.UNREGISTER_MESSAGE
            })
        } 
        else if(installedApplication.user.registerStatus == userEnums.userStatusEnum.UNCONFIRMED){
            res.status(global.WAITING_VALIDATION_CODE);
            res.send({
                code: global.WAITING_VALIDATION_CODE,
                message: global.WAITING_VALIDATION_MESSAGE
            })
        }
        else if(installedApplication.user.registerStatus == userEnums.userStatusEnum.CONFIRMED) {
            res.userId = installedApplication.user._id;
            next();

        }
    }).catch(err=>{
        console.log(err.message)
        res.status(500).send({
            code:500,
            message: "There is a problem"
        })
    })
}