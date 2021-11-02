const express = require('express');
const router = express.Router();
const { Manatee, User} = require('../../models');
const bcrypt = require("bcrypt");

// The `http://localhost:3000/api/users` endpoint

//FIND ALL USERS

router.get("/", async (req,res)=>{
    try {
        const userData = await User.findAll({
                include:[{model:Manatee}],
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
        include: [{ model: Manatee }],
      });
      if (!userData) {
        res.status(404).json({ message: 'No User found with that id!' });
        return;
      }
      res.status(200).json(userData);
    } 
    catch (err) {
      res.status(500).json(err);
    }
  });

// FIND A SINGLE USER USING LOGIN CREDENTIALS  
router.get('/info', async (req, res) => {
    try {
      const userData = await User.findByPk(req.session.id, {
        include: [{ model: Manatee }],
      });
      if (!userData) {
        res.status(404).json({ message: 'No User found with that id!' });
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

//UPDATE EXISTING USER USERNAME OR PASSWORD
router.put("/updateUN", async (req, res)=> {
    try {
        const foundUser = await User.findOne({
            where:{
                id:req.session.id
            }
        })
        if(!foundUser){
            res.status(401).json({message:"Something Went Wrong"})
        } else {
            if(bcrypt.compareSync(req.body.password,foundUser.password)){
                const user = await User.update(
                    {
                        username: req.body.username,
                    },
                );
                res.status(200).json(user);
            } else {
                res.status(401).json({message:"incorrect Password"})
                }
            }
        }
    catch(err) {
         console.log(err);
        res.status(500).json(err);
    }
})

//UPDATE EXISTING USER USERNAME OR PASSWORD
router.put("/updatePW", async (req, res)=> {
    try {
        const foundUser = await User.findOne({
            where:{
                id:req.session.id
            }
        })
        if(!foundUser){
            res.status(401).json({message:"Something Went Wrong"})
        } else {
            if(bcrypt.compareSync(req.body.password,foundUser.password)){
                const user = await User.update(
                    {
                        password: req.body.newPassword
                    },
                );
                res.status(200).json(user);
            } else {
                res.status(401).json({message:"incorrect Password"})
                }
            }
        }
    catch(err) {
         console.log(err);
        res.status(500).json(err);
    }
})

//SIGN UP USER

router.post("/signup", async (req,res)=>{
    // req.session.destroy();
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
    res.render("dashboard");
})

//DELETE USER

router.delete("/delete",async (req,res)=>{
    try{
        const delUser = await User.destroy({
            where:{
                id:req.session.id
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