const express = require("express");
const router = express.Router();
const {User, Manatee} = require("../models");

router.get("/dashboard", (req,res)=>{
    res.render("dashboard")
})

<<<<<<< HEAD
router.get("/login", (req,res)=>{
    res.render("login")
=======
router.get('/login', (req,res)=>{
    res.render('login')
>>>>>>> 1a723574101b26a621f531beb081d3e4011d5d43
});

module.exports = router;