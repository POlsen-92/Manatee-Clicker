const express = require("express");
const router = express.Router();
const {User, Manatee, UserManatee} = require("../models");

router.get("/", (req,res)=>{
    res.redirect("/leaderboard")
});

router.get("/dashboard", (req,res)=>{
    res.render("dashboard")
});

router.get('/login', (req,res)=>{
    res.render('login')
});

router.get('/settings', (req,res)=>{
    res.render('settings')
});

router.get('/leaderboard', (req,res)=>{
    res.render('leaderboard')
});

module.exports = router;