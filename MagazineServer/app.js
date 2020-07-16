const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const helmet = require('helmet');
const chalk = require('chalk');

const conn = require('./utils/db'); // <-- db.js

const UserRouter = require("./routes/user");
const ArticleRouter = require("./routes/article");
const LoginRouter = require("./routes/login");
const LogoutRouter = require("./routes/logout");

const app = express();


app.use(cors());
app.use(bodyParser.json());
app.use(helmet());


app.use((req, res, next) => {
    //logger for all requests on server endpoints
    console.log(`${chalk.yellow(new Date())} ---- ${chalk.green(req.method)} ---- ${chalk.blue(req.url)} `);
    next();
});


app.use("/user", UserRouter);
app.use("/article", ArticleRouter);
app.use("/login", LoginRouter);
app.use("/logout", LogoutRouter);

module.exports = app;
