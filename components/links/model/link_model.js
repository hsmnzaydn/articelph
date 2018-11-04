var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var link = new Schema(
    {
        link:{type:String,default:null}

    }
);


module.exports = mongoose.model('Link', link);

