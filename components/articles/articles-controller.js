const articleSchema = require('./model/article_model')
      constant = require('../../Utils/Constants')

module.exports = {
    getArticles,
    createArticle,
    updateArticle,
    getArticle
}

async function getArticles(req, res, next) {
    articleSchema.find().then(function (articles) {
        res.status(global.OK_CODE).send(articles)
    }).catch(next)
}


async function createArticle(req,res,next){
    
}

async function updateArticle(req,res,next) {
    
}

async function getArticle(req,res,next) {
    
}