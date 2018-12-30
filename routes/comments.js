var express = require("express"); 
var router = express.Router({mergeParams: true}); 
var BoardGame = require("../models/boardgame");
var Comment = require("../models/comment");
var middleware = require("../middleware");

//form to add a comment
router.get("/new", middleware.isLoggedIn, function(req, res) {
    BoardGame.findById(req.params.id).populate("comments").exec(function(err, foundBoardGame) {
        if (err) {
            console.log(err);
            req.flash("error", err.message);
            res.redirect("back"); 
        } else {
            res.render("comments/new", {boardgame: foundBoardGame});
        }
    });
});

//go create the comment
router.post("/", middleware.isLoggedIn, function(req, res) {
    BoardGame.findById(req.params.id, function(err, boardgame) {
        if (err) {
            console.log(err); 
            req.flash("error", err.message); 
            res.redirect("/boardgames"); 
        } else {
            Comment.create(req.body.comment, function(err, comment) {
                if (err) {
                    req.flash("error", err.message); 
                    console.log(err); 
                } else {
                    comment.author.id = req.user._id; 
                    comment.author.username = req.user.username; 
                    comment.save(); 
                    
                    boardgame.comments.push(comment); 
                    boardgame.save(); 
                    
                    req.flash("success", "Successfully added comment"); 
                    res.redirect("/boardgames/" + boardgame._id);
                }
            });
        }
    });
});

router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req, res) {
    Comment.findById(req.params.comment_id, function(err, foundComment) {
        if (err) {
            req.flash("error", err.message); 
            res.redirect("back"); 
        } else {
            BoardGame.findById(req.params.id, function(err, foundBoardGame) {
                if (err) {
                    req.flash("error", err.message); 
                    res.redirect("back"); 
                } else {
                    res.render("comments/edit", {boardgame: foundBoardGame, comment: foundComment});
                }
            });
        }
    });
});

router.put("/:comment_id", middleware.checkCommentOwnership, function(req, res) {
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment) {
        if (err) {
            req.flash("error", err.message); 
            res.redirect("back"); 
        } else {
            res.redirect("/boardgames/" + req.params.id); 
        }
    });
});

router.delete("/:comment_id", middleware.checkCommentOwnership, function(req, res) {
    Comment.findByIdAndRemove(req.params.comment_id, function(err) {
        if (err) {
            req.flash("error", err.message); 
            res.redirect("back"); 
        } else {
            res.redirect("/boardgames/" + req.params.id); 
        }
    });
});


module.exports = router;