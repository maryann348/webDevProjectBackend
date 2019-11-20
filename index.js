const express = require("express");
const app = express();
const mongoose = require("mongoose");
const postRoutes = require("./routes/posts");
const userRoutes = require('./routes/user')
const cors = require("cors");
const multer = require('multer')
require("dotenv/config");
const url = 'mongodb://localhost:27017/maryann'

//middlewares
app.use(cors());
app.use(express.json());
app.use("/posts", postRoutes);
app.use('/user', userRoutes )

//connect to the database
mongoose.connect(
  url,
  { useUnifiedTopology: true, useNewUrlParser: true },
  () => {
    console.log("Connected to database");
  }
);

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'images')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now())
  }
});

var upload = multer({ storage: storage });

app.post('/posts/img', upload.single('photo'), (req, res, next) => {
  console.log('hello')
  //var img = fs.readFileSync(req.file.path);
 // console.log(req.file)
})

//listens to connections in port 3000
app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
