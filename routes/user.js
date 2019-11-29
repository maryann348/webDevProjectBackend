const express = require("express");
const bodyParser = require('body-parser');
const router = express.Router();
const User = require("../models/RegisterSchema");
const jwt = require('jsonwebtoken');
const config = require('./key');
const bcrypt = require('bcryptjs');
const saltRounds = 10;
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

//Login Router
router.post('/login', (req, res) => {
    // console.log(req.body)
    var email = req.body.Email
    var pass = req.body.Password
    User.findOne({ Email: email }, function(err, data){
        if (err){
            res.send(err)
        }
        if(data != null){
            var match = bcrypt.compareSync(pass, data.Password)
                if(match){
                    var acc_token = jwt.sign({ data },"token1234", {expiresIn: "12h"})
                    res.send({
                        status: true,
                        auth: true,
                        user: data,
                        token: acc_token
                    })
                }else{
                    res.send({
                        status: false,
                        auth: false,
                        sms: "Incorrect Password!!"
                    })
                }
            }
                res.send({
                    status: false,
                    auth: false,
                    sms: "Username not found!!"
                })
    })
})

    router.get('/getUser', function(req, res){
        let email = req.body.Email
        User.findOne({ Email : email }, function(err,data){
            if(err){
                res.send(err)
            }
            if(data == null){
                res.status(404).json({ message: 'User not found' })
            }else {
                res.status(200).json({message: 'success',user: data, auth: true})
            }
        })
    })
//         .then(doc => {
//             if (doc) {
//                 var token = jwt.sign({
//                     _id: doc._id,
//                 }, config.secret, {
//                         expiresIn: 86400
//                     });
//                 res.status(200).json({
//                     auth: true,
//                     token: token
//                 });

//             } else {
//                 res.status(404).json({ message: 'User not found' })
//             }
//         })
//         .catch(err => {
//             res.status(400).json({ message: err.message })
//         })
// });

//registration router
router.post('/register', (req, res) => {
    let user = new User(req.body);
    user.Password = bcrypt.hashSync(user.Password, saltRounds);
    // console.log(req.body)
    user.save(function(err, resp){
        if (err) {
            res.send(err)
        }else {
            res.send({
                sms: "Successfully Saved",
                user: resp
            })
        }
    });
//         .then(() => {
//             // res.status(200).json({message:'Successfully saved'});
//             var token = jwt.sign({
//                 _id: user._id,
//             }, config.secret, {
//                     expiresIn: 86400
//                 });
//             res.status(200).json({
//                 auth: true,
//                 token: token
//             });
//             console.log('saved')

//         })
//         .catch(err => {
//             res.status(400).json({ message: err.message })
//         });

});
    //use validation
        router.post('/validateEmail' , (req, res) => {
            User.findOne({Email : req.body.Email})
            .then(User => User ? res.sendStatus(204): res.sendStatus(200))
        });
// router.post('/getUser', function(re))

// router.post('/dashboard', (req, res) => {

//     //ibutang diri ang token gkan sa front end na naka save sa local storage
//     let code = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZGQyOTBjMTBjMWI2OTBjODA4ODg4OTgiLCJpYXQiOjE1NzQwODExNTIsImV4cCI6MTU3NDE2NzU1Mn0.uvu1u1yJEy2LlbNqRMPdddUOygSeuwE0MhuR_KUFmrY"
//     let token = jwt.decode(code)
//     User.findOne({ _id: token._id })
//         .then((doc) => {
//             if (doc) {
//                 res.status(200).json({ data: doc })
//             }
//         })
//         .catch(err => {
//             res.status(400).json({ message: err.message })
//         })
// })

module.exports = router