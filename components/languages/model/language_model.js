var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var language = new Schema(
    {
        language:{type:String,default:null}
        

    }
);


module.exports = mongoose.model('Language', language);

