var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var installedApplication = new Schema(
    {
        udid:{type:String,default:null},
        user:{type:mongoose.Schema.Types.ObjectId, ref:"User",default:null}
        

    }
);


module.exports = mongoose.model('InstalledApplication', installedApplication);

