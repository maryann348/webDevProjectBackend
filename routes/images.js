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
    limits: {   
        fieldSize: 100000000
    },
    fileFilter: fileFilter
});
//saves images to database
ImageRouter.route("/uploadmulter")
.post(upload.array('image'), (req, res, next) => {
    console.log(req.file);
    // console.log(req.file.filename);
    const img = req.files;
    if(!img){
        console.log(err);
        res.send(err);
    }else{
        img.map(image => {
            let url = 'http://localhost:3000/'+image.filename;
            // var new_img = new Image({name: image.filename, url:url})
            const newImage = new Image({
                imageURL: url,
                imageDescription: req.body.imageDescription,
                created_at:new Date()
            });
            // const newImage = new Image({
            //     imageURL: url,
            //     imageDescription: req.body.imageDescription,
            //     created_at:new Date()
            // });
            newImage.save(
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
        })
    }
    // if(!req.files){
    //     var file = fs.readFileSync(req.file.path);
    //     console.log(file)
    //     // var encode_image = file.toString('base64');
    // }
    // let url = 'http://localhost:3000/'+req.file.filename;

    const newImage = new Image({
        imageURL: url,
        imageDescription: req.body.imageDescription,
        created_at:new Date()
    });
    newImage.save(
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
    // .then((result)=>{
    //     console.log(result);
    //     res.status(200).json({
    //         success: true,
    //         document: result
    //     });
    // })
    // .catch((err) => next(err));
});
//retrieve images
// ImageRouter.get('images/:filename', function(req,res){
//     console.log(req.params.filename)
//     let file = _dirname+'/images' + req.params.filename;
//     res.sendFile(file);
// })
ImageRouter.get('/post', function(req, res) {
    // try{
        // var dataGet ={_id: req.params.i}
    //     res.json(dataGet);
    // }catch (err){
    //     res.json({message : err});
    // }
    
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
    //     .exec(function (err, doc){
    //     if(err){
    //         return next(err)
    //     }
    //     // var base64data = new Buffer(doc.fileData, 'binary').toString('base64');
    //     // var res = {
    //     //     fileData: base64data,
    //     //     mime: doc.mimetype,
    //     //     name: doc.fileName
    //     // }
    //     res.contentType('json');
    //     res.send(doc)
    // })
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
// ImageRouter.post('/display', function (req, res){
//     var data ={
//         file: req.body.fileData,
//         mime: req.body.mime,
//         name: req.body.name
//     }
//     res.json(data)
// })



module.exports = ImageRouter