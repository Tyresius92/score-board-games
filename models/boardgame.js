var mongoose = require("mongoose");

var boardGameSchema = new mongoose.Schema({
    name: String, 
    price: String,
    img: String, 
    description: String, 
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    },
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId, 
            ref: "Comment"
        }
    ]
});

var BoardGame = mongoose.model("BoardGame", boardGameSchema); 

module.exports = BoardGame;