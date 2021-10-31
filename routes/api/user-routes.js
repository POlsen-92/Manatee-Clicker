const express = require('express');
const router = express.Router();
const { ManateeLevel, User} = require('../../models');
const bcrypt = require("bcrypt");

// The `http://localhost:3000/api/users` endpoint

//FIND ALL USERS

router.get("/", async (req,res)=>{
    try {
        const userData = await User.findAll({
            include:[{ model:ManateeLevel}]
        }).then(dbUsers=>{
            if(dbUsers.length){
                res.json(dbUsers)
            } else {
                res.status(404).json({message:"No users found!"})
            }
        })
    } catch(err) {
        console.log(err);
        res.status(500).json({message:"an error occured",err:err})
    }
})

//SIGN IN WITH EXISTING USER

router.post("/signin",(req,res)=>{
    User.findOne({
        where:{
            username:req.body.username
        }
    }).then(foundUser=>{
        if(!foundUser){
            req.session.destroy();
            res.status(401).json({message:"incorrect username or password"})
        } else {
            if(bcrypt.compareSync(req.body.password,foundUser.password)){
                req.session.user = {
                    username:foundUser.username,,
                    id:foundUser.id
                }
                res.json(foundUser) 
            } else {
                res.status(401).json({message:"incorrect username or password"})
                req.session.destroy();
            }
        }
    }).catch(err=>{
         console.log(err);
        res.status(500).json(err);
    })
})

//UPDATE EXISTING USER
router.put("/:id",(req))

//SIGN UP USER

router.post("/signup",(req,res)=>{
    req.session.destroy();
    User.create({
        username:req.body.username,
        password:req.body.password
    }).then(newUser=>{
        res.json(newUser);
    }).catch(err=>{
        console.log(err);
        res.status(500).json({message:"an error occured",err:err})
    })
})

//SIGN OUT OF USER PROFILE 

router.get("/signout",(req,res) => {
    req.session.destroy();
    res.render("signout");
})

//DELETE USER

router.delete("/:id",(req,res)=>{
    User.destroy({
        where:{
            id:req.params.id
        }
    }).then(delUser=>{
        res.json(delUser)
    })
})

