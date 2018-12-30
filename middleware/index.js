var BoardGame = require("../models/boardgame");
var Comment = require("../models/comment");

var middlewareObj = {};

middlewareObj.checkBoardGameOwnership = function(req, res, next) {
    if (req.isAuthenticated()) {
        BoardGame.findById(req.params.id, function(err, foundBoardGame) {
            if (err) {
                req.flash("error", "Board game not found"); 
                res.redirect("back"); 
            } else {
                
                // a properly formatted but nonexistent id will return an undefined object
                if (!foundBoardGame) {
                    req.flash("error", "Item not found"); 
                    return res.redirect("back"); 
                }
                
                // foundBoardGame.author.id is an object. req.user._id is a string
                if (foundBoardGame.author.id.equals(req.user._id)) { 
                    next(); 
                } else {
                    req.flash("error", "You lack the permission to do that!")
                    res.redirect("back"); 
                }
            }
        });
    } else {
        req.flash("error", "You need to be logged in to do that!")
        res.redirect("back");
    }
}

middlewareObj.checkCommentOwnership = function(req, res, next) {
    if (req.isAuthenticated()) {
        Comment.findById(req.params.comment_id, function(err, foundComment) {
            if (err) {
                req.flash("error", "Comment not found.");
                res.redirect("back"); 
            } else {
                // a properly formatted but nonexistent id will return an undefined object
                if (!foundComment) {
                    req.flash("error", "Item not found"); 
                    return res.redirect("back"); 
                }
                
                // foundComment.author.id is a mongoose object. req.user._id is a string. Don't use === or ==
                if (foundComment.author.id.equals(req.user._id)) { 
                    next(); 
                } else {
                    req.flash("error", "You don't have permission to do that."); 
                    res.redirect("back"); 
                }
            }
        });
    } else {
        req.flash("error", "You need to be logged in to do that!"); 
        res.redirect("back");
    }
}

middlewareObj.isLoggedIn = function(req, res, next) {
    if (req.isAuthenticated()) {
        return next(); 
    }
    req.flash("error", "Please log in first!"); 
    
    req.session.returnTo = req.originalUrl; 
    res.redirect("/login"); 
}

module.exports = middlewareObj;