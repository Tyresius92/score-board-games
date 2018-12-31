// Require all the dependencies
var express = require("express"); 
var app = express(); 
var bodyParser = require("body-parser"); 
var mongoose = require("mongoose"); 
var passport = require("passport"); 
var LocalStrategy = require("passport-local"); 
var expressSession = require("express-session"); 
var methodOverride = require("method-override"); 
var flash = require("connect-flash"); 

// Import all the models
var User = require("./models/user"); 

// Import all the routes
var boardgameRoutes = require("./routes/boardgames"); 
var commentRoutes = require("./routes/comments");
var indexRoutes = require("./routes/index"); 

// Create default database url
var dburl = process.env.DATABASEURL || "mongodb://localhost:27017/score_board_games";

// Connect to the database
mongoose.connect(dburl);

// Set up default app settings. 
app.use(express.static(__dirname + "/public")); 
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method")); 
app.use(flash());
app.set("view engine", "ejs"); 

// Passport Config
app.use(expressSession({
    secret: "Board Games are so freaking dope", 
    resave: false, 
    saveUninitialized: false
}));

app.use(passport.initialize()); 
app.use(passport.session()); 
passport.use(new LocalStrategy(User.authenticate())); 
passport.serializeUser(User.serializeUser()); 
passport.deserializeUser(User.deserializeUser()); 

// Methods to be called on all routes
app.use(function(req, res, next) {
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error"); 
    res.locals.success = req.flash("success"); 
    next();
});

// Set up the route prefixes
app.use("/", indexRoutes); 
app.use("/boardgames/:id/comments", commentRoutes); 
app.use("/boardgames", boardgameRoutes); 

// Set up 404 page
app.use(function (req, res, next) {
  res.status(404).render("not_found");
});

// Start the server and listen for requests!
app.listen(process.env.PORT, process.env.IP, function() {
    console.log("The ScoreBoardGames server is running!");
});