var mongoose = require("mongoose");

var boardGameSchema = new mongoose.Schema({
    name: String, 
    price: String,
    min_players: Number, 
    max_players: Number, 
    runtime: Number,
    image: String, 
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