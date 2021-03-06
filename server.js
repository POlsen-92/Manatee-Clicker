const express = require('express');
const sequelize = require("./config/connection.js");
const session = require("express-session");
const exphbs = require('express-handlebars');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

// Sets up the Express App
const app = express();
const PORT = process.env.PORT || 3000;

const hbs = exphbs.create({});

// Requiring our models for syncing
const {User, Manatee, UserManatee} = require('./models');
const routes = require("./routes"); 

// Sets up handlebars for the app's front end
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.use(express.static("public"));

// Sets up the Express app to handle data parsing
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {},
    store: new SequelizeStore({
        db:sequelize
     })
  }))

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//routing utility 
app.use(routes)

//Starting the server
sequelize.sync({ force: false }).then(function() {
    app.listen(PORT, function() {
    console.log('App listening on PORT ' + PORT);
    });
});