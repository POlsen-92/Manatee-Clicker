const express = require("express");
const router = express.Router();
const {User, ManateeLevel} = require("../models");

router.get("/dashboard", (req,res)=>{
    res.render("dashboard")
})

module.exports = router;