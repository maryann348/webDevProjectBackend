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

        router.post('/login', (req, res) => {
            // console.log(req.body)
            var email = req.body.Email
            var pass = req.body.Password
            User.findOne({ Email: email }, function(err, data){
                if (err){
                    return res.send(err)
                }
                if(data != null){
                    var match = bcrypt.compareSync(pass, data.Password)
                        if(match){
                            var acc_token = jwt.sign({ data },"token1234", {expiresIn: "12h"})
                            return res.send({
                                status: true,
                                auth: true,
                                user: data,
                                token: acc_token
                            })
                        }else{
                            return res.send({
                                status: false,
                                auth: false,
                                sms: "Incorrect Password!!"
                            })
                        }
                    }
                    return res.send({
                            status: false,
                            auth: false,
                            sms: "Username not found!!"
                        })
            })
        });
    router.get('/getUser/:Email', (req, res) => {
        User.findOne({ Email: req.params.Email })
    .then(data => {
        return res.send(data)
      console.log(data);
      
    })
    .catch(error => {
        return res.send(error)
      console.log(error);
      
    })
});


//registration router
router.post('/register', (req, res) => {
    console.log(req);

    let newUser = new User(req.body.data);
    // user.Password = bcrypt.hashSync(user.Password, saltRounds);
    console.log(newUser)
    newUser.save()
        .then(user => {
            res.sendStatus(200);
            console.log(user);

        })
        .catch(err => {
            // console.log(err);
            res.status(400).send("failed");

        });
    // user.save(function(err, resp){
    //     if (err) {
    //         res.send(err)
    //     }else {
    //         res.send({
    //             sms: "Successfully Saved",
    //             user: resp
    //         })
    //     }
    // });
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
router.post('/validateEmail', (req, res) => {
    User.findOne({ Email: req.body.Email })
        .then(User => User ? res.sendStatus(204) : res.sendStatus(200))
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
        // })
// });

module.exports = router