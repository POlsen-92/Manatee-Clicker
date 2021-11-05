const express = require('express');
const router = express.Router();
const { Manatee, User, UserManatee} = require('../../models');
const bcrypt = require("bcrypt");
const session = require('express-session');
const sortArray = require('sort-array');

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

//GETS THE USERS IN DESC. ORDER BY LIFETIME SCORE
router.get("/leaders", async (req,res)=>{
    try{
        let usersArray = await User.findAll();
        usersArray = sortArray(usersArray, {
            by: 'lifetime_points',
            order: 'desc'
        });
    res.status(200).json(usersArray);
    }
    catch (err){
        console.log(err);
        res.status(500).json({message:"an error occured",err:err})
    }
})

// FIND A SINGLE USER USING LOGIN CREDENTIALS  
router.get('/info', async (req, res) => {
    try {
      const userData = await User.findByPk(req.session.user.id, {
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
      console.log(err)
    }
  });

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
            } 
            else {
                if(bcrypt.compareSync(req.body.password,foundUser.password)){
                    
                    req.session.logged_in = true;
                    req.session.user = {
                    username:foundUser.username,
                    id:foundUser.id
                }
                res.json(foundUser)
                } 
                else {
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
                id:req.session.user.id
            }
        })
        if(!foundUser){
            res.status(401).json({message:"Something Went Wrong1"})
        } else {
            if(bcrypt.compareSync(req.body.password,foundUser.password)){
                const user = await User.update({
                    username:req.body.username,
                }, {
                    where: {id:req.session.user.id}
                }
                );
                req.session.user = {
                    username:req.body.username,
                    id:foundUser.id
                }
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
                id:req.session.user.id
            }
        })
        if(!foundUser){
            res.status(401).json({message:"Something Went Wrong"})
        } else {
            if(bcrypt.compareSync(req.body.password,foundUser.password)){
                const newPassword = await bcrypt.hash(req.body.newPassword,5)
                const user = await User.update({
                    password:newPassword,
                }, {
                    where: {id:req.session.user.id}
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

// UPDATE TO USER POINTS
router.put("/updatepoints", async (req,res)=>{
    console.log("===================")
    console.log(req.body)
    try {
        const foundUser = await User.findByPk(req.session.user.id, {
          include: [{ model: Manatee }],
        });
        if (!foundUser) {
          res.status(404).json({ message: 'No User found with that id!' });
          return;
        } else {
            User.update({
            points_on_hand: req.body.points_on_hand,
            lifetime_points: req.body.lifetime_points
        },
        {
            where:{
                id:req.session.user.id
            }
        }
        )}
      } 
      catch (err) {
        res.status(500).json(err);
        console.log(err)
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
        UserManatee.bulkCreate([
              {
              user_id: newUser.id,
              manatee_id: 1,
              count: 0
              },
              {
              user_id: newUser.id,
              manatee_id: 2,
              count:0
              },
              {
              user_id: newUser.id,
              manatee_id: 3,
              count: 0
              },
              {
              user_id: newUser.id,
              manatee_id: 4,
              count: 0
              },
            ], {
              individualHooks: true,
              returning: true,
            });
            req.session.user = {
                username:newUser.username,
                id:newUser.id
            }
            req.session.save(() => {
                req.session.user_id = newUser.id;
                req.session.logged_in = true;
          
                res.status(200).json(newUser);
              })
    }
    catch(err){
        console.log(err);
        res.status(500).json({message:"an error occured",err:err})
    }
})

//SIGN OUT OF USER PROFILE 
router.post("/signout",(req,res) => {
    req.session.logged_in = false;
    req.session.destroy()
    res.status(200).json({message:"signed out successful"})
})

//DELETE USER
router.delete("/delete", async (req,res)=>{
    try{
        const delUser = await User.destroy({
            where:{
                id:req.session.user.id
            }
        })
        if (!delUser) {
            res.status(404).json({ message: 'No User with this id!' });
            return;
          }
        res.json(delUser)
        req.session.destroy()
    }
    catch(err){
        console.log(err);
        res.status(500).json({message:"an error occured",err:err})
    }
})

module.exports = router;