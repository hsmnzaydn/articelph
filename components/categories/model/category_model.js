var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var category = new Schema(
    {
        name:{type:String,default:null}
        

    }
);


module.exports = mongoose.model('Category', category);

