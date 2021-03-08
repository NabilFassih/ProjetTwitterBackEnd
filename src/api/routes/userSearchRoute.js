const userSearchController = require('../controllers/userSearchController');

module.exports = (app) => {
    app.route('/usersearch')
        .get(userSearchController.getAllUserSearch)
        .post(userSearchController.createUserSearch);


    app.route('/usersearch/:idUserSearch')
        .delete(userSearchController.deleteUserSearch)
        .put(userSearchController.updateUserSearch)
        .get(userSearchController.getUserSearch);

    app.route('/usersearch/:idUser/namesearch/:nameSearch')
        .get(userSearchController.getUserSearchByIdUserAndByNameSearch);
        
};