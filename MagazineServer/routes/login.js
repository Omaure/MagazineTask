const express = require('express');
const jwt = require('jsonwebtoken');

const userModel = require('../models/user');

const router = express.Router();

router.post('/', async (req, res) => {
    const usermail = req.body.email;
    const password = req.body.password;
    console.log("======", usermail, "============", password);
    console.log("------------", JSON.stringify(req.body));

    try {
        const currentUser = await userModel.find({email: usermail});

        if (currentUser.length === 0) {
            res.send(401, "Invalid Information");
        } else {
            // test a matching password
            currentUser[0].comparePassword(password, async (err, isMatch) => {
                if (err) throw err;
                if (isMatch) {
                    if (!currentUser[0].token) {
                        const signToken = await jwt.sign({usermail: usermail}, "secretkey");
                        currentUser[0].token = signToken;
                        //save new Token
                        const result = await userModel.findByIdAndUpdate(currentUser[0]._id, currentUser[0]);
                        res.send({user: {'name': currentUser[0].fullName}, token: signToken});
                    }
                    res.status(200).send({user: {'name': currentUser[0].fullName}, token: currentUser[0].token});

                } else {
                    res.send(401, "Invalid Information");
                }
            })
        }
    } catch (error) {
        res.send(error);
    }
});

module.exports = router;
