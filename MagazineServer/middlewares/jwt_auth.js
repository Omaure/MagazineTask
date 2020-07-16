const jwt = require('jsonwebtoken');
const chalk = require('chalk');


let checkJWT = async (req, res, next) => {
    try {
        const token = req.header("JWT");
        console.log(chalk.green(token));

        const decoded = await jwt.verify(token, "secretkey");
        console.log(decoded.usermail);
        next();
    } catch (error) {
        console.log(chalk.bgRed.white(error));
        res.status(401).send("verfication error");
    }
};


module.exports = checkJWT;
