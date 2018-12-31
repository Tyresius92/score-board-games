var express = require("express"); 
var router = express.Router({mergeParams: true}); 
var BoardGame = require("../models/boardgame"); 
var middleware = require("../middleware");

//show all of the boardgames in the database
router.get("/", function(req, res) {
    
    BoardGame.find({}, function(err, allBoardGames) {
        if (err) {
            console.log(err); 
        } else {
            res.render("boardgames/index", {boardgames: allBoardGames});
        }
    });
});

// create a new boardgame
router.post("/", middleware.isLoggedIn, function(req, res) {
    var newBoardGame = req.body.boardgame; 
    
    newBoardGame.author = {
        id: req.user._id, 
        username: req.user.username
    }
    
    BoardGame.create(newBoardGame, function(err, newlyCreated) {
        if (err) {
            console.log(err); 
        } else {
            res.redirect("/boardgames");
        }
    });
});

// show the form to add a board game to the database
router.get("/new", middleware.isLoggedIn, function(req, res) {
    res.render("boardgames/new"); 
});

// show the page for a single game
router.get("/:id", function(req, res) {
    BoardGame.findById(req.params.id).populate("comments").exec(function(err, foundBoardGame) {
        if (err) {
            console.log(err);
            req.flash("error", "We couldn't find that boardgame"); 
            res.redirect("/boardgames");
        } else {
            res.render("boardgames/show", {boardgame: foundBoardGame});
        }
    });
});

// Show the page to update a boardgame
router.get("/:id/edit", middleware.checkBoardGameOwnership, function(req, res) {
    BoardGame.findById(req.params.id, function(err, foundBoardGame) {
        if (err) {
            res.redirect("/boardgames"); 
        } else {
            res.render("boardgames/edit", {boardgame: foundBoardGame}); 
        }
    });
});

// update the board game
router.put("/:id", middleware.checkBoardGameOwnership, function(req, res) {
    BoardGame.findByIdAndUpdate(req.params.id, req.body.boardgame, function(err, updatedBoardGame) {
        if (err) {
            res.redirect("/boardgames"); 
        } else {
            res.redirect("/boardgames/" + req.params.id);
        }
    });
});

router.delete("/:id", middleware.checkBoardGameOwnership, function(req, res) {
    BoardGame.findByIdAndRemove(req.params.id, function(err) {
        if (err) {
            res.redirect("/boardgames"); 
        } else{
            res.redirect("/boardgames"); 
        }
    });
});

module.exports = router; 