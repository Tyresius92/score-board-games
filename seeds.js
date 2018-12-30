var mongoose = require("mongoose");
var BoardGame = require("./models/boardgame");
var Comment   = require("./models/comment");
 
var data = [
    {name: "Secret Hitler", img: "https://dtgreviews.com/wp-content/uploads/2017/01/secret-hitler.jpg", 
        description: "Much deception. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    },
    {name: "Two Rooms and a Boom", img: "https://images-na.ssl-images-amazon.com/images/I/7121vlX9xOL._SL1500_.jpg", 
        description: "Good game, very fun, wow! Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    }, 
    {name: "Settlers of Catan", img: "https://catanshop.com/content/images/thumbs/0000380_catan_600.jpeg", 
        description: "Smaller game, much fun! Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    }, 
    {name: "Dominion", img: "https://boardgaming.com/wp-content/uploads/2008/01/Dominion-header.jpg", 
        description: "Much flexible, never play same game twice! Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    }, 
    {name: "Pandemic", img: "https://images-cdn.zmangames.com/us-east-1/filer_public/e8/c8/e8c88415-26ed-4e43-96a7-978dd9853ad0/zm7101_box_front.png", 
        description: "Collaborative game. Not much fun. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    }, 
    {name: "Acquire", img: "https://cf.geekdo-images.com/opengraph/img/ZROTHrwW5bOzIqNIh6oQsqx9ytM=/fit-in/1200x630/pic3299296.jpg", 
        description: "Money game! Fun, but hard! Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    }
]
 
function seedDB(){
   //Remove all board games
   BoardGame.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("removed boardgames!");
        Comment.remove({}, function(err) {
            if(err){
                console.log(err);
            }
            console.log("removed comments!");
             //add a few board games
            data.forEach(function(seed){
                BoardGame.create(seed, function(err, boardgame){
                    if(err){
                        console.log(err)
                    } else {
                        console.log("added a boardgame");
                        //create a comment
                        Comment.create(
                            {
                                text: "This game is great, but I wish there was a mobile version",
                                author: "Homer"
                            }, function(err, comment){
                                if(err){
                                    console.log(err);
                                } else {
                                    boardgame.comments.push(comment);
                                    boardgame.save();
                                    console.log("Created new comment");
                                }
                            });
                    }
                });
            });
        });
    }); 
    //add a few comments
}
 
module.exports = seedDB;