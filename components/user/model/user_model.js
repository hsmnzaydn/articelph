var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var user = new Schema(
    {
        installedApplication:{type:mongoose.Schema.Types.ObjectId, ref:"InstalledApplication",default:null},
        emailAddress:{type:String,default:null},
        name:{type:String,default:null},
        password:{type:String,default:null},
        registerStatus:{type:String,enum:['UNREGISTER','UNCONFIRMED','CONFIRMED']},
        profile:{type:mongoose.Schema.Types.ObjectId, ref:"Profile",default:null}
        

    }
);


module.exports = mongoose.model('User', user);

