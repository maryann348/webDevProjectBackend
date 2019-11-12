const express = require("express");
const app = express();
const mongoose = require("mongoose");
const postRoutes = require("./routes/posts");
const cors = require("cors");
require("dotenv/config");

//middlewares
app.use(cors());
app.use(express.json());
app.use("/posts", postRoutes);

//connect to the database
mongoose.connect(
  process.env.DB_CONNECT,
  { useUnifiedTopology: true, useNewUrlParser: true },
  () => {
    console.log("Connected to database");
  }
);

//listens to connections in port 3000
app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
