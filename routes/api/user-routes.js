const express = require('express');
const router = express.Router();
const { Manatee, User, UserManatee} = require('../../models');
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

// UPDATE TO USER POINTS
router.put("/updatepoints", async (req,res)=>{
    try {
        const foundUser = await User.findByPk(req.session.user.id, {
          include: [{ model: Manatee }],
        });
        if (!foundUser) {
          res.status(404).json({ message: 'No User found with that id!' });
          return;
        } else {User.update({
            lifetime_points: req.body.lifetime_points,
            points_on_hand: req.body.points_on_hand
        })}
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
        res.json(newUser);
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
    }
    catch(err){
        console.log(err);
        res.status(500).json({message:"an error occured",err:err})
    }
})

//SIGN OUT OF USER PROFILE 

router.post("/signout",(req,res) => {
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