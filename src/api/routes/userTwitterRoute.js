const userTwitterController = require("../controllers/userTwitterController");

module.exports = (app) => {
    app.route("/usertwitter")
        .post(userTwitterController.createUserTwitter);

    app.route("/usertwitter/:idUser")
        .get(userTwitterController.getUserTwitter);

    app.route("/usertwitter/:idUser/tweets")
        .get(userTwitterController.fetchTweetsByUserId);
};
