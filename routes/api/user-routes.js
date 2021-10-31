const express = require('express');
const router = express.Router();
const { ManateeLevel, User} = require('../../models');
const bcrypt = require("bcrypt");

// The `http://localhost:3000/api/users` endpoint

//FIND ALL USERS

router.get("/", async (req,res)=>{
    try {
        const userData = await User.findAll({
                include:[{model:ManateeLevel}],
            })
            res.status(200).json(userData)
    }
    catch(err) {
        console.log(err);
        res.status(500).json({message:"an error occured",err:err})
    }
})

//FIND A SINGLE USER
router.get('/:id', async (req, res) => {
    try {
      const userData = await User.findByPk(req.params.id, {
        include: [{ model: ManateeLevel }],
      });
      if (!userData) {
        res.status(404).json({ message: 'No ManateeLevel found with that id!' });
        return;
      }
      res.status(200).json(userData);
    } 
    catch (err) {
      res.status(500).json(err);
    }
  });

//SIGN IN WITH EXISTING USER

router.post("/signin", async (req,res)=>{
    try {
        const foundUser = await User.findOne({
            where:{
                username:req.body.username
            }
        })
        if(!foundUser){
            req.session.destroy();
            res.status(401).json({message:"incorrect username or password"})
        } else {
            if(bcrypt.compareSync(req.body.password,foundUser.password)){
                req.session.user = {
                    username:foundUser.username,
                    id:foundUser.id
                }
                res.json(foundUser) 
            } else {
                res.status(401).json({message:"incorrect username or password"})
                req.session.destroy();
                }
            }
        }
    catch(err) {
         console.log(err);
        res.status(500).json(err);
    }
})

//UPDATE EXISTING USER
router.put("/:id", async (req, res)=> {
    try {
        const user = await User.update(
            {
                username: req.body.username,
                password: req.body.password
            },
            {
                where: {
                    id: req.params.id
                }
            }
        );
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json(err)
    }
})

//SIGN UP USER

router.post("/signup", async (req,res)=>{
    req.session.destroy();
    try {
        const newUser = await User.create({
            username:req.body.username,
            password:req.body.password
        })
        res.json(newUser);
    }
    catch(err){
        console.log(err);
        res.status(500).json({message:"an error occured",err:err})
    }
})

//SIGN OUT OF USER PROFILE 

router.get("/signout",(req,res) => {
    req.session.destroy();
    res.render("signout");
})

//DELETE USER

router.delete("/:id",async (req,res)=>{
    try{
        const delUser = await User.destroy({
            where:{
                id:req.params.id
            }
        })
        if (!delUser) {
            res.status(404).json({ message: 'No User with this id!' });
            return;
          }
        res.json(delUser)
    }
    catch(err){
        console.log(err);
        res.status(500).json({message:"an error occured",err:err})
    }
})

module.exports = router;