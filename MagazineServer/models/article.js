const {Schema: mongooseSchema, model} = require("mongoose");
const mongoose = require("mongoose");
let ArticleSchema = new mongooseSchema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    authorId: {type: mongoose.Types.ObjectId, ref: 'user'},
});

ArticleSchema.statics.getAllArticles = function () {
    return this.find({}).populate("authorId");
};

ArticleSchema.statics.getArticleByAuthorID = function(id){
    return this.find({authorId:id});
};


let ArticleModel = model('article', ArticleSchema);
module.exports = ArticleModel;

