const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");
const mongoStore = require("connect-mongo")(session);
const Twitter = require("./twitter");
const Cron = require('./cron');

const app = express();

const hostname = "0.0.0.0";
const port = 8080;

mongoose.connect("mongodb://mongo/apiprojectnodeback");

app.use(
    session({
        secret: "azerty",
        resave: false,
        saveUninitialized: false,
    })
);

app.use(passport.initialize());

app.use(passport.session());

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.status(200);
    res.send("Hello World Api :)");
});

const userRoute = require("./api/routes/userRoute");
userRoute(app);

const userSearchRoute = require("./api/routes/userSearchRoute");
userSearchRoute(app);

const userTwitterRoute = require("./api/routes/userTwitterRoute");
userTwitterRoute(app);

const authRoute = require("./api/routes/authRoute");
authRoute(app);

const trendsRoute = require("./api/routes/trendsRoute");
trendsRoute(app);

Cron.getTopTweet();

app.listen(port, hostname);
