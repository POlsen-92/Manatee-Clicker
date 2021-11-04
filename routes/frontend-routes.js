const express = require("express");
const router = express.Router();
const {User, Manatee, UserManatee} = require("../models");

router.get("/", (req,res)=>{
    res.redirect("/leaderboard", {logged_in: req.session.logged_in})
});

router.get("/dashboard", (req,res)=>{
    res.render("dashboard", {logged_in: req.session.logged_in})

});

router.get('/login', (req,res)=>{
    res.render('login', {logged_in: req.session.logged_in})
});

router.get('/settings', (req,res)=>{
    res.render('settings', {logged_in: req.session.logged_in})
});

router.get('/leaderboard', (req,res)=>{
    res.render('leaderboard', {logged_in: req.session.logged_in})
});

module.exports = router;