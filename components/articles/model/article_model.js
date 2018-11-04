var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var article = new Schema(
    {
        category:{type:mongoose.Schema.Types.ObjectId, ref:"Category",default:null},
        link:{type:mongoose.Schema.Types.ObjectId, ref:"Link",default:null},
        status:{type:String,enum:['NOTTRANSLATED','TRANSLATED','TRANSLATING']},
        defaultLanguage:{type:mongoose.Schema.Types.ObjectId, ref:"Language",default:null},
        transgerLanguage:{type:mongoose.Schema.Types.ObjectId, ref:"Language",default:null},
        thumbNailPhoto:{type:mongoose.Schema.Types.ObjectId, ref:"Link",default:null},
        description:{type:String},
        postedBy:{type:mongoose.Schema.Types.ObjectId, ref:"User",default:null},
        translator:{type:mongoose.Schema.Types.ObjectId, ref:"User",default:null},

    }
);


module.exports = mongoose.model('Article', article);

