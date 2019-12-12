var express = require('express');
var Image = require('../models/imgSchema');
var ImageRouter = express.Router();
var mongoose = require("mongoose")
// const router = express.Router();
const multer = require('multer');
const fs = require('fs');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './images/')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname);
    }
});
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/gif') {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

const upload = multer({
    storage: storage,
    // limits: {   
    //     fieldSize: 1024 * 1024 * 5
    // },
    fileFilter: fileFilter
});
//saves images to database
ImageRouter.route("/uploadmulter")
    .post(upload.single('image'), (req, res, next) => {
        // console.log(req.file.filename);
        // const newImage = new Image({})
        if (!req.files) {
            var file = fs.readFileSync(req.file.path);
            // var encode_image = file.toString('base64');
        }
        let url = 'http://localhost:4000/' + req.file.filename;
        console.log(mongoose.Types.ObjectId(req.body.user), );
        const newImage = new Image({
            userId: mongoose.Types.ObjectId(req.body.user),
            imageURL: url,
            user: req.body.user,
            imageData: req.file.path,
            imageDescription: req.body.imageDescription,
            created_at: new Date()
        });
        newImage.save()
            .then((result) => {
                res.status(200).json({
                    success: true,
                    document: result
                });
            })
            .catch((err) => next(err));
    });
// });
//retrieve images
// ImageRouter.get('images/:filename', function(req,res){
//     console.log(req.params.filename)
//     let file = _dirname+'/images' + req.params.filename;
//     res.sendFile(file);
// })
ImageRouter.get('/post/:query', function (req, res) {
    var query  =req.params.query !== 'null'? {user:req.params.query}:{}    
    Image.find(query).populate('userId')
        .sort({
            created_at: 'desc'
        }).then(
            (err, data) => {
                if (err) {
                    res.send(err)
                } else {
                    res.send(data)
                }
            })
});
ImageRouter.get('/Image/:id', (req, res) => {
    Image.find({
            userId: req.params.id
        })
        .populate('userId')
        .exec((err, data) => {
            if (err || !data.length) {
                res.send(err);
            }
            let pictures = []
            data.forEach(element => {
                if (element.userId._id == req.params.id) {
                    pictures.push(element)
                }

            });
            res.send(pictures)
        })
})
ImageRouter.get('/rate/:user/:id/:newValue', (req, res) => {

    console.log(req.params);
    // update({"_id": args._id, "viewData._id": widgetId}, {$set: {"viewData.$.widgetData": widgetDoc.widgetData}})
    Image.updateOne({
            _id: req.params.id,
            "ratings.user": req.params.user
        }, {
            $set: {
                "user": req.params.user,
                'rate': req.params.newvalue
            }
        }, {
            new: true,
            upsert: true
        },
        (error, success) => {
            if (error) {
                console.log(error);

                res.status(404).send({
                    error: error,
                })
            } else {
                res.status(200).send(success)
            }
        })


})

module.exports = ImageRouter