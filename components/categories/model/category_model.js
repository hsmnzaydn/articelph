var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var category = new Schema(
    {
        categoryName:{type:String,default:null}
        

    }
);


module.exports = mongoose.model('Category', category);

