var express = require('express');
var Image = require('../models/imgSchema');
var ImageRouter = express.Router();
const router = express.Router();
const multer = require('multer');
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
    limits: {   
        fieldSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});

ImageRouter.route("/uploadmulter")
.post(upload.single('image'), (req, res, next) => {
    console.log(req.file);
    const newImage = new Image({
        imageURL: req.body.imageURL,
        imageDescription: req.body.imageDescription 
    });
    newImage.save()
    .then((result)=>{
        console.log(result);
        res.status(200).json({
            success: true,
            document: result
        });
    })
    .catch((err) => next(err));
});
ImageRouter.get('images/:filename', function(req,res){
    console.log(req.params.filename)
    let file = _dirname+'/images' + req.params.filename;
    res.sendFile(file);
})



module.exports = ImageRouter