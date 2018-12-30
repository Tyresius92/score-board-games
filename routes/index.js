var express = require("express"); 
var router = express.Router(); 
var passport = require("passport"); 
var User = require("../models/user"); 
var BoardGame = require("../models/boardgame")

//root route
router.get("/", function(req, res) {
    res.render("landing");
});

//show form to create a user account
router.get("/register", function(req, res) {
    res.render("register"); 
});

//go create the account
router.post("/register", function(req, res) {
    var newUser = new User({username: req.body.username});
    
    User.register(newUser, req.body.password, function(err, user) {
        if (err) {
            console.log(err); 
            return res.render("register"); 
        }
        passport.authenticate("local")(req, res, function() {
            req.flash("success", "Account created! Nice to meet you " + req.body.username); 
            res.redirect("/boardgames"); 
        });
    });
});

//present the login page
router.get("/login", function(req, res) {
    res.render("login"); 
});

//attempt to log in
router.post("/login", passport.authenticate("local", 
    {
        failureRedirect: "/login"
    }), function(req, res) {
        var returnTo = req.session.returnTo ? req.session.returnTo : "/boardgames";
        delete req.session.returnTo;
        res.redirect(returnTo);
});

//log the current user out
router.get("/logout", function(req, res) {
    req.logout(); 
    res.redirect("/boardgames")
});

module.exports = router; 