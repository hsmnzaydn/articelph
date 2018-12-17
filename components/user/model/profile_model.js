var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var profile = new Schema(
    {
        user:{type:mongoose.Schema.Types.ObjectId, ref:"User",default:null},
        profileImage:{type:String,default:null},
        beforeTransferedArticleList:[{type:mongoose.Schema.Types.ObjectId, ref:"Article",default:null}],
        requestArticleList:[{type:mongoose.Schema.Types.ObjectId, ref:"Article",default:null}]
        

    }
);


module.exports = mongoose.model('Profile', profile);

