const express = require("express");
const router = express.Router();
const fs = require("fs");
const Post = require("../models/PostSchema");
const img = require("../models/imgSchema");
// var picture = fs.readFileSync("./images");
// var newData =JSON.parse(picture);



// if(newData.rate == 0){
//   var ratings =(Number(newData.rate)+ Number(rate))
//   newData.rate = ratings;
//   fs.writeFile("./images", JSON.stringify(newData), function (err){
//     if(err) throw err;
//     console.log('sucessfully rated');
//   });
//   resizeBy.end(""+ newData.rate)
//   // if(err) throw err{
//   //   console.log('Successfully Rated');
//   // }


// }else{
//   var ratings = (Number(newData.rate) + Number(rate))
//   newData.rate = ratings;
//   newData.rate = Number(Number(newData.rate / 2).toFixed(2))
//   fs.writeFile("./images", JSON.stringify(newData), function(err){
//     if(err) throw err;
//     console.log('successfully rated');
//   });
//   resizeBy.end(""+newData.rate)
// }
//gets all posts from the database
// router.get("/", async (request, response) => {
//   try {
//     const posts = await Post.find();
//     response.json(posts);
//   } catch (error) {
//     response.json({ message: error });
//   }
// });

//Gets a specific post using an id
// router.get("/:postID", async (request, response) => {
//   try {
//     const post = await Post.findById(request.params.postID);
//     response.json(post);
//   } catch (error) {
//     response.json({ message: error });
//   }
// });

//Saves a new post
// router.post("/", async (request, response) => {
//   console.log(request.body)
//   const post = new Post({
//     title: request.body.title,
//     description: request.body.description
//   });

//   try {
//     const savePost = await post.save();
//     response.json(savePost);
//   } catch (error) {
//     response.json({ message: error });
//   }
// });

//deletes a post
// router.delete("/:postID", async (request, response) => {
//   try {
//     const post = await Post.remove({ _id: request.params.postID });
//     response.json(post);
//   } catch (error) {
//     response.json({ message: error });
//   }
// });

//updates the title of a post
// router.patch("/:postID", async (request, response) => {
//   try {
//     const post = await Post.updateOne(
//       { _id: request.params.postID },
//       { $set: { title: request.body.title } }
//     );
//     response.json(post);
//   } catch (error) {
//     response.json({ message: error });
//   }
// });

// router.post('/img',(req, res) =>{
//   console.log(req.body.file)
//   res.end()

// })


// router.post('/ratings', (req, res) =>{
//   let userID = '5dd290c10c1b690c80888898'
//   //let
//   let post = new Post()
// })

// function getRating(id){
//   Product.aggregate
// }
// }
module.exports = router;
