const express = require("express");
const router = express.Router();
const {User, Manatee, UserManatee} = require("../models");

//Our page redirects to the leaderboard by default
router.get("/", (req,res)=>{
    res.redirect("/leaderboard")
});

//If the user is logged in, render the dashbaord, otherwise redirect to the leaderboard
router.get("/dashboard", (req,res)=>{
    if(!req.session.user){
        return res.redirect("/leaderboard")
    }
    res.render("dashboard", {logged_in: req.session.logged_in})
});

//Render the login page, after user login, redirect to leaderboard
router.get('/login', (req,res)=>{
    if(req.session.user){
        return res.redirect("/dashboard")
    }
    res.render('login')
});

//If the user is logged in, render the settings, otherwise redirect to the leaderboard
router.get('/settings', (req,res)=>{
    if(!req.session.user){
        return res.redirect("/leaderboard")
    }
    res.render('settings', {logged_in: req.session.logged_in})
});

//This route renders the leaderboard
router.get('/leaderboard', (req,res)=>{
    res.render('leaderboard', {logged_in: req.session.logged_in})
});

module.exports = router;