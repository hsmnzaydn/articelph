const userSchema=require('./model/user_model')
      installedApplicationSchema=require('./model/installed_application_model')
      profileSchema=require('./model/profile_model')

module.exports={registerUser}

async function registerUser(req,res,next) {
    var udid=req.headers.udid;
    
    var installedApplicationObject=new installedApplicationSchema({
          udid:udid
    })

    var userObject=new userSchema({
        installedApplication:installedApplicationObject._id,
        emailAdress:req.body.emailAdress,
        name:req.body.name,
        password:req.body.password
    })

    var profile=new profileSchema({
        user:userObject
    })
    userObject.profile=profile._id;
    installedApplicationObject.user=userObject._id;
    userObject.installedApplication=installedApplicationObject._id;

    installedApplicationObject.save().then(installedApplication=>{
        console.log(installedApplication)
    }).catch(next)

    profile.save().then(profile=>{
        console.log(profile)
    }).catch(next)


    userObject.save().then(function(user){
        console.log(user)
        res.send({
            code:200,
            message:'Ok',
            secretKey:installedApplicationObject._id
        })
    }).catch(next)

}