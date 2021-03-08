const trendsController = require('../controllers/trendsController');

module.exports = (app) => {
    app.route('/trends/')
        .get(trendsController.getTweetFromDb);
};