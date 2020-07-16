const express = require("express")
const mongoose = require('mongoose');
const chalk = require('chalk');
const jwt = require('jsonwebtoken');

let router = express.Router();

let ArticleModel = require("../models/article");
let UserModel = require("../models/user");

const checkJWT = require("../middlewares/jwt_auth");

router.use(checkJWT);

router.post('/', async (req, res) => {

    console.log("Creating an Article", req.body);

    try {
        const newArticle = new ArticleModel({
            title: req.body.title,
            description: req.body.description,
            authorId: req.body.authorId,
        });
        const article = await newArticle.save();
        res.status(201).json(article);
    } catch (error) {
        console.log(error);
        res.sendStatus(409);
    }
});

router.get('/all', async (req, res) => {

    try {
        let results = "";
        results = await ArticleModel.find({})
            .lean()
            .populate("authorId", "fullName")
            .exec();

        res.json(results);
    } catch (error) {
        console.log(error);
        res.send(404, {
            error
        })
    }
});

router.get('/myarticles', async (req, res) => {

    try {
        const currentUser = await UserModel.find({token: req.header("JWT")}).exec();
        let results = "";
        results = await ArticleModel.find({authorId: currentUser[0]._id})
            .lean()
            .populate("authorId", "fullName")
            .exec();

        res.json(results);
    } catch (error) {
        console.log(error);
        res.send(404, {
            error
        })
    }
});

router.get('/:articleId', async (req, res) => {

    console.log(req.params);
    const articleId = req.params.articleId;

    try {
        if (articleId === null) {
            res.json("No Id found");
        }
        let results = "";

        results = await ArticleModel.find({_id: articleId})
            .lean()
            .populate("authorId", "fullName")
            .exec();

        res.json(results);
    } catch (error) {
        console.log(error);
        res.send(404, {
            error
        })
    }
});


router.delete('/:articleId', async (req, res) => {
    try {
        let articleId = req.params.articleId;
        let results = await ArticleModel.findByIdAndDelete(articleId).exec();
        res.json(results);
    } catch (error) {
        console.log(error);
        res.send(404, {
            error
        })
    }
});

router.patch('/:articleId', async (req, res) => {

    try {
        let articleId = req.params.articleId;
        console.log(req.body);

        let results = await ArticleModel.findByIdAndUpdate(articleId, req.body, {new: true}).exec();
        res.json(results);
    } catch (error) {
        console.log(error);
        res.send(404, {
            error
        })
    }
});


module.exports = router;


