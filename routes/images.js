var express = require('express');
var Image = require('../models/imgSchema');
var ImageRouter = express.Router();
// const router = express.Router();
const multer = require('multer');
const fs = require('fs');
const storage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, './images/')
    },
    filename: function (req, file, cb){
        cb(null, Date.now() + file.originalname);
    }
});
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/gif'){
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
    if(!req.files){
        var file = fs.readFileSync(req.file.path);
        // var encode_image = file.toString('base64');
    }
    let url = 'http://localhost:4000/'+req.file.filename;

    const newImage = new Image({
        imageURL: url,
        imageData : req.file.path,
        imageDescription: req.body.imageDescription,
        created_at:new Date()
    });
    newImage.save()
    //     (err,data) => {
    //         if(err){`
    //             console.log(err);
    //             res.send(err)
    //         }
    //         else{
    //             console.log(data);
    //             res.send(data)
    //         }
    //     }
    // )
    .then((result)=>{
        console.log(result);
        res.status(200).json({
            success: true,
            document: result
        });
    })
    .catch((err) => next(err));
});
ImageRouter.get('/post', function(req, res) {
    Image.find({},
        (err,data) => {
            if(err){
                console.log(err);
                res.send(err)
            }
            else{
                console.log(data);
                res.send(data)
            }
        }
        )
    .sort({created_at: 'desc'});
});
ImageRouter.get('/Image/:id',(req, res) => {
    picture.Image.find({})
    .populate('userId')
    .exec((err, data) => {
        if (err || !data.length){
            res.send(err);
        }
        let pictures =[]
        data.forEach(element => {
            if(element.userId._id == req.params.id){
                pictures.push(element)
            }
            
        });
        res.send(pictures)
    })
})

module.exports = ImageRouter