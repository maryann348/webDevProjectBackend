const express = require("express");
const router = express.Router();
const User = require("../models/RegisterSchema");
const jwt = require('jsonwebtoken');
const config = require('./key')

router.post('/login', (req, res) => {
    console.log(req.body)
    User.findOne({ Email: req.body.Email })
        .then(doc => {
            if (doc) {
                var token = jwt.sign({
                    _id: doc._id,
                }, config.secret, {
                        expiresIn: 86400
                    });
                res.status(200).json({
                    auth: true,
                    token: token
                });

            } else {
                res.status(404).json({ message: 'User not found' })
            }
        })
        .catch(err => {
            res.status(400).json({ message: err.message })
        })
});

router.post('/register', (req, res) => {
    let user = new User(req.body);
    console.log(req.body)
    user.save()
        .then(() => {
            // res.status(200).json({message:'Successfully saved'});
            var token = jwt.sign({
                _id: user._id,
            }, config.secret, {
                    expiresIn: 86400
                });
            res.status(200).json({
                auth: true,
                token: token
            });
            console.log('saved')

        })
        .catch(err => {
            res.status(400).json({ message: err.message })
        });

});

router.post('/dashboard', (req, res) => {

    //ibutang diri ang token gkan sa front end na naka save sa local storage
    let code = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZGQyOTBjMTBjMWI2OTBjODA4ODg4OTgiLCJpYXQiOjE1NzQwODExNTIsImV4cCI6MTU3NDE2NzU1Mn0.uvu1u1yJEy2LlbNqRMPdddUOygSeuwE0MhuR_KUFmrY"
    let token = jwt.decode(code)
    User.findOne({ _id: token._id })
        .then((doc) => {
            if (doc) {
                res.status(200).json({ data: doc })
            }
        })
        .catch(err => {
            res.status(400).json({ message: err.message })
        })
})

module.exports = router