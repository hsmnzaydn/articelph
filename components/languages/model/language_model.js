var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var language = new Schema(
    {
        code:{type:String,default:null},
        name:{type:String,default:null},
        nativeName:{type:String,default:null}
        

    }
);


module.exports = mongoose.model('Language', language);

