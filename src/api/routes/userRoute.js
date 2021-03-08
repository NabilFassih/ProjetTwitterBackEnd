const userController = require('../controllers/userController');

module.exports = (app) => {
    app.route('/users')
        .get(userController.getAllUser)
        .post(userController.createUser);

    app.route('/login')
        .post(userController.login);

    app.route('/signup')
        .post(userController.createUser);

    app.route('/users/:idUser')
        .delete(userController.deleteUser)
        .put(userController.updateUser)
        .get(userController.getUser);
};