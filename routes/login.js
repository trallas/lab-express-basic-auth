const router = require("express").Router();
const User = require("../models/User.model");
const bcrypt = require("bcryptjs");
const saltRounds = 14;

router.get("/login", (req, res, next) => {
    res.render("login")
})

router.post("/login", (req, res, next) => {
    let {username, password} = req.body;
    let loginData = {username, password}

    if(username == "" || password == "") {
        loginData.errorMessage = "You can't leave any blank fields"
        res.render("login", loginData)
        return;
    }

    User.find({username})
    .then(users => {
        if (users.length == 0) {
            loginData.errorMessage = "Wrong username"
            res.render("login", loginData)
            return;
        }
        let userDB = users[0];
        if (bcrypt.compareSync(password, userDB.password)) {
            req.session.currentUser
        } 
    })
    .catch(err => next(err))
})
  module.exports = router;