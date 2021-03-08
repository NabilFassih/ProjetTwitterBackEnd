const mongoose = require('mongoose');
const userSearch = require('../models/userSearch');

// Function to create userSearch in DB
exports.createUserSearch = (req, res) => {
    let new_userSearch = new userSearch(req.body);
    try {
        new_userSearch.save((error, user) => {
            if (error) {
                res.status(400);
                res.json({ message: "Incomplete request" });
            } else {
                res.status(201);
                res.json(user)
            }
        })
    }
    catch (e) {
        res.status(500);
        res.json({ message: "Server error" });
    }
    
};

// Function to get all userSearch from DB
exports.getAllUserSearch = (req, res) => {
    userSearch.find({}, (error, userSearch) => {
        if (error) {
            res.status(500);
            res.json({ message: "Server error" })
        } else {
            res.status(200);
            for (let i in userSearch) {
                userSearch[i] = userSearch[i].toObject();
                userSearch[i]['id'] = userSearch[i]['_id'];
            }
            res.setHeader('X-Total-Count', userSearch.length);
            res.header('Access-Control-Expose-Headers', 'X-Total-Count');
            res.json(userSearch);
        }
    })
};

//Function to delete a userSearch
exports.deleteUserSearch = (req, res) => {
    try {
        userSearch.findByIdAndRemove(req.params.idUserSearch, (error) => {
            if (error) {
                res.status(400);
                res.json({ message: "UserSearch not found" });
            } else {
                res.status(200);
                res.json({ message: "UserSearch deleted" })
            }
        })
    } catch (error) {
        res.status(500);
        res.json({ message: "Server error" });
    }
};

// Function to get one userSearch
exports.getUserSearch = (req, res) => {
    try {
        userSearch.findById(req.params.idUserSearch, (error, userSearch) => {
            if (error) {
                res.status(404);
                console.log(error);
                res.json({ message: "User search not found"});
            }
            else {
                userSearch = userSearch.toObject();
                res.status(200);
                res.json(userSearch);
            }
        })
    } catch (e) {
        res.status(500);
        console.log(e);
        res.json({ message: "Server error" });
    }
};

// Function to update userSearch
exports.updateUserSearch = (req, res) => {
    try {
        userSearch.findByIdAndUpdate(req.params.idUserSearch, req.body, { new: true }, (error) => {
            if (error) {
                res.status(400);
                console.log(error);
                res.json({ message: "User search not found" });
            }
            else {
                res.status(200);
                res.json("User search has been successfully changed");
            }
        })
    } catch (e) {
        res.status(500);
        console.log(e);
        res.json({ message: "Error server" })
    }

};

// Function to get user search by idUser and Name Search 
exports.getUserSearchByIdUserAndByNameSearch = (req, res) => {
    userSearch.find({idUser: req.params.idUser, nameSearch: req.params.nameSearch}, (error, userSearch) => {
        if (error) {
            res.status(500);
            res.json({ message: "Server error" })
        } else {
            res.status(200);
            res.setHeader('X-Total-Count', userSearch.length);
            res.header('Access-Control-Expose-Headers', 'X-Total-Count');
            res.json(userSearch);
        }
    })
};