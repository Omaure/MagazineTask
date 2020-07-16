const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const helmet = require('helmet');
const chalk = require('chalk');

const UserRouter = require("./routes/user");
const ArticleRouter = require("./routes/article");
const LoginRouter = require("./routes/login");
const LogoutRouter = require("./routes/logout");

const app = express();


app.use(cors());
app.use(bodyParser.json());
app.use(helmet());

const PORT = process.env.PORT || 3100;


mongoose
    .connect("mongodb://localhost:27017/MagazineApp", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log(chalk.green("Database Connection Established"));
    })
    .catch((err) => console.log(chalk.bgRed.white(err)));

app.use((req, res, next) => {
    //logger for all requests on server endpoints
    console.log(`${chalk.yellow(new Date())} ---- ${chalk.green(req.method)} ---- ${chalk.blue(req.url)} `);

    next();
});


app.use("/user", UserRouter);
app.use("/article", ArticleRouter);
app.use("/login", LoginRouter);
app.use("/logout", LogoutRouter);

app.listen(PORT, (err) => {
    if (!err) {
        console.log(`Server is Listening on ${PORT}`);
    } else {
        console.log(chalk.bgRed.white(err))
    }
});
