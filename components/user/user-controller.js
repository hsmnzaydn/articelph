const userSchema = require('./model/user_model')
      installedApplicationSchema = require('./model/installed_application_model')
      profileSchema = require('./model/profile_model')
      constant = require('../../Utils/Constants')
      utility = require('../../Utils/Utility')
      uuid = require('uuid/v1');
      userEnums = require('./enums')
      mailUtility = require('../../Utils/mail_utility')
module.exports = {
    registerUser,
    getProfile,
    updateUser
}

async function registerUser(req, res, next) {
    var udid = req.headers.udid;

    var installedApplicationObject = new installedApplicationSchema({
        udid: udid
    })

    var userObject = new userSchema({
        installedApplication: installedApplicationObject._id,
        emailAddress: req.body.emailAdress,
        name: req.body.name,
        registerStatus: userEnums.userStatusEnum.UNCONFIRMED,
        password: req.body.password
    })

    var profile = new profileSchema({
        user: userObject._id
    })
    userObject.profile = profile._id;
    installedApplicationObject.user = userObject._id;
    userObject.installedApplication = installedApplicationObject._id;




    userObject.save().then(function (user) {
        installedApplicationObject.save()
    }).then(function () {
        profile.save()
    }).then(function () {
        mailUtility.sendMail(userObject.emailAddress)

    }).then(function () {
        res.send({
            code: global.WAITING_VALIDATION_CODE,
            message: global.WAITING_VALIDATION_MESSAGE,
            secretKey: installedApplicationObject._id
        })
    }).catch(next)

}


async function getProfile(req, res, next) {
    userSchema.findById({
        _id: req.params.id
    }).
    select(['name', 'emailAddress']).
    populate({
        path: 'profile',
        populate: {
            path: 'Article'
        }
    }).then(user => {
        res.send(user)
    }).catch(err => {
        next(err.message)
        console.log(err.message)
    });
}

async function updateUser(req, res, next) {
    var updateArea = req.query.area
    userSchema.findById({
        _id: req.params.id
    }).
    populate({
        path: 'profile'
    }).
    then(user => {
        if (updateArea == 'NAME') {
            user.name = req.body.user.name
        } else if (updateArea == 'EMAILADRESS') {
            user.emailAddress = req.body.user.emailAdress
        } else if (updateArea == 'PROFILEIMAGE') {
            if (req.files != null) {
                var imageName = uuid() + '.jpg';
                let image = req.files.upload;
                global.saveImageMultiPart(image, imageName, next);
                profileSchema.findOne({
                    user: req.params.id
                }).then(profile => {
                    profile.profileImage = imageName
                    profile.save()
                }).catch(next)
            }
        }
        user.save()

        res.send({
            code: global.OK_CODE,
            message: global.OK_MESSAGE
        })
    }).catch(next)
}