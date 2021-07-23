const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
require("dotenv").config();

const createAccessToken = (payload, expiresIn = "1h") => {
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn });
};

module.exports = {
    async registerUser(req, res) {
        try {
            const errors = await validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ error: errors.array() });
            }
            let user = await User.findOne({email : req.body.email});
            if (user) {
                return res.status(400).json({ msg: "User already Exist" });
            }

            let saltRounds = await bcrypt.genSalt(10);
            let hashedPassword = await bcrypt.hash(req.body.password, saltRounds);

            let newUser = new User({
                name: req.body.name,
                password: hashedPassword,
                email: req.body.email,
            });

            user = await newUser.save();
            let payload = {
                _id: user._id,
                email: user.email,
                name: user.name,
                isVerified: user.isVerified,
            };

            let accessToken = createAccessToken(payload);

            res.status(201).json({ payload, accessToken });
        } catch (err) {
            console.log(err);
        }
    },
    async fetchUser(req, res) {
        try {
          const user = req.user;
          res.status(200).json({ user });
        } catch (err) {
          res.status(500).send("Internal Server Error");
          console.log(err);
        }
      },
    async loginUser(req, res) {
        try {
            const errors = await validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ error: errors.array() });
            }
            let user = await User.findOne({email : req.body.email});
            if (user) {
                let passwordMatch = await bcrypt.compare(
                    req.body.password,
                    user.password
                );
                if (!passwordMatch) {
                    return res.status(400).json({ msg: "Invalid credentials" });
                }
                let payload = {
                    _id: user._id,
                    email: user.email,
                    name: user.name,
                    isVerified: user.isVerified,
                };
                let accessToken = createAccessToken(payload);

                return res.status(200).json({ payload, accessToken });
            }
            return res.status(400).json({ msg: "Invalid credentials" });
        } catch (err) {
            res.status(500).send(err);
        }
    },

    async getAllUsers(req, res) {
        try {
            const user = await User.find({}, { password: 0 });
            res.status(200).json({ user });
        } catch (err) {
            res.status(500).send("Internal Server Error");
        }
    },

    async deleteUser(req, res) {
        try {
            const { userId } = req.params;
            await User.findByIdAndDelete(userId);
            res.status(200).send(`User ${userId} deleted.`);
        } catch (err) {
            res.status(500).send("Internal Server Error");
        }
    },
    async updateUser(req, res) {
        // console.log("hih")
        try {
            const userId = req.user._id;
            const user = await User.findOneAndUpdate(
                { _id: userId },
                {
                    $set: { ...req.body },
                },
                {
                    new: true,
                    projection: {
                        password: 0,
                    },
                }
            );
            res.status(200).send(user);
        } catch (err) {
            res.status(500).send("Internal Server Error");
            console.log(err);
        }
    },
    async followUser(req,res){
        try{
            const userId = req.user._id;
            console.log(req.user)
            const user=await User.findById(userId);
            const newUser=await User.findById(req.body._id);
            if(!newUser.followers.includes(userId)){
                await user.updateOne({$push:{following:req.body._id}});
                await newUser.updateOne({$push:{followers:userId}});
                res.status(200).send("followed");
            }
            else{
                res.status(500).send("you already follow");
            }
        }
        catch(err){

            console.log(err);
        }
    },
    async unFollowUser(req,res){
        try{
            const userId = req.params.id;
            const user=await User.findById(userId);
            const newUser=await User.findById(req.body._id);
            if(newUser.followers.includes(userId)){
                await user.updateOne({$pull:{following:req.body._id}});
                await newUser.updateOne({$pull:{followers:userId}});
                res.status(200).send("unfollowed");
            }
            else{
                res.status(500).send("you dont't follow yet");
            }
        }
        catch(err){
            console.log(err);
        }
    }
}
