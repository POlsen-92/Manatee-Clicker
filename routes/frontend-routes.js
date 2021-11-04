const express = require("express");
const router = express.Router();
const {User, Manatee, UserManatee} = require("../models");

router.get("/", (req,res)=>{
    res.redirect("/leaderboard")
});

router.get("/dashboard", (req,res)=>{
    if(!req.session.user){
        return res.redirect("/leaderboard")
    }
    res.render("dashboard", {logged_in: req.session.logged_in})
});

router.get('/login', (req,res)=>{
    if(req.session.user){
        return res.redirect("/leaderboard")
    }
    res.render('login')
});

router.get('/settings', (req,res)=>{
    if(!req.session.user){
        return res.redirect("/leaderboard")
    }
    res.render('settings', {logged_in: req.session.logged_in})
});

router.get('/leaderboard', (req,res)=>{
    res.render('leaderboard', {logged_in: req.session.logged_in})
});

module.exports = router;