const userSchema = require('./model/user_model')
installedApplicationSchema = require('./model/installed_application_model')
profileSchema = require('./model/profile_model')
constant = require('../../Utils/Constants')
utility = require('../../Utils/Utility')
uuid = require('uuid/v1');

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
        emailAdress: req.body.emailAdress,
        name: req.body.name,
        password: req.body.password
    })

    var profile = new profileSchema({
        user: userObject._id
    })
    userObject.profile = profile._id;
    installedApplicationObject.user = userObject._id;
    userObject.installedApplication = installedApplicationObject._id;

    installedApplicationObject.save().then(installedApplication => {
        console.log(installedApplication)
    }).catch(next)

    profile.save().then(profile => {
        console.log(profile)
    }).catch(next)


    userObject.save().then(function (user) {
        console.log(user)
        res.send({
            code: 200,
            message: 'OK',
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
                    profile.save().catch(next)
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