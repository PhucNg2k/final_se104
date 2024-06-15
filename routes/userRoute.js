const express = require("express");
const router = express.Router();
const User = require("../models/user");
const mongoose = require('mongoose');


router.post("/register", async(req,res)=>{
    const newuser = new User({name:req.body.name, email:req.body.email, cmnd: req.body.cmnd, address: req.body.address ,password:req.body.password,cpassword:req.body.cpassword})

    try{
        const user = await newuser.save()
        res.send("User register successfully")
    } catch (error){
        return res.status(400).json({error});
    }

});

router.post("/login",async(req,res)=>{
    const {email, password} = req.body

    try{
        const user = await User.findOne({email:email,password:password})
        if(user){
            const temp ={
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                _id: user._id,
            }
            res.send(temp)
        }
        else{
            return res.status(400).json({message:"Login Fail"});
        }
    } catch(error){
        return res.status(400).json({error});
    }

});



router.get('/getallusers', async (req, res) => {
    try{
        const users = await User.find()
        res.send(users)
    } catch (error) {
        return res.status(400).json({error})
    }
})

router.get('/getuser/:id', async (req, res) => {
    const userId = req.params.id;
  
    
  
    try {
      const user = await User.findById(userId);
      if (user) {
        res.json(user);
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    } catch (error) {
      console.error("Error fetching user by ID:", error); // Log the error
      res.status(500).json({ message: error.message });
    }
  });


module.exports = router