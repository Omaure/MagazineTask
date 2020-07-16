const express = require("express")
const mongoose = require('mongoose');
const chalk = require('chalk');
const jwt = require('jsonwebtoken');

let router = express.Router();

let UserModel = require("../models/user");

const checkJWT = require("../middlewares/jwt_auth");

router.post('/', async (req, res) => {
    console.log("Creating a new user", req.body);

    try {
        const newUser = new UserModel({
            fullName: req.body.fullName,
            password: req.body.password,
            email: req.body.email,
        });
        const user = await newUser.save();
        res.status(201).json(user);
    } catch (error) {
        console.log(error);
        res.sendStatus(409);
    }
});

router.use(checkJWT);

router.get('/', async (req, res) => {

    try {
        let results = "";
        if (req.header("JWT") !== null) {
            results = await UserModel.find({token: req.header("JWT")}).exec()
        } else {
            results = await UserModel.find({}).exec()
        }
        res.status(200).json(results)
    } catch (error) {
        console.log(error);
        res.send(404, {
            error
        })
    }
});

router.delete('/:id', async (req, res) => {
    try {
        let id = req.params.id;
        let results = await UserModel.findByIdAndDelete(id).exec();
        res.status(200).json(results);
    } catch (error) {
        console.log(error);
        res.send(404, {
            error
        })
    }
});

router.patch('/:id', async (req, res) => {
    try {
        let id = req.params.id;
        console.log(req.body);
        let results = await UserModel.findByIdAndUpdate(id, req.body, {new: true}).exec();
        res.status(200).json(results)
    } catch (error) {
        console.log(error);
        res.send(404, {
            error
        })
    }
});


module.exports = router;
