const express = require("express");
const router = express.Router();
const Guest = require("../../models/Guest");
const generateToken = require("../../utils/generateToken");
const mongoose = require ("mongoose")

router.post("/", async (req, res) => {
    const { email, lastname, name, picture } = req.body;

    const user = await Guest.findOne({ email });
    const password = email + process.env.SECURE_TOKEN


    if(!user) {
        const newUser = await Guest.create({ email, lastname, name, password, picture , verified: true});
        res.json({
            email: newUser.email,
            name: newUser.given_name,
            lastname: newUser.lastname,
            password: newUser.password,
            picture: newUser.picture,
            token: generateToken(newUser._id),
            verified: true,
            _id: newUser._id
        })

    } else {
        if(user.Visibility === true) {
            res.json(user)
        } else {
            res.status(400).send("Usuario baneado")
        }
    
    }
    
});




module.exports = router;