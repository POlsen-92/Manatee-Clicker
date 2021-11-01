const express = require("express");
const router = express.Router();
const {User, Manatee} = require("../models");

router.get("/dashboard", (req,res)=>{
    res.render("dashboard")
})

router.get('/login' (req,res)=>{
    res.render('login')
});

module.exports = router;