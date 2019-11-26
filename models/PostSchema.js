const mongoose = require("mongoose");

//schema of a post
const postSchema = mongoose.Schema({
  userID: {
    type: Object
  },
  imgID:{
    type: Object
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  rating: {
    type: Number,
    default: 0
    // required: true
  }
  // ratings: {
  //   avgRating: {
  //     type: Number,
  //     default:0
  //   },
  //   totalRating: {
  //     type: Number,
  //     default:0
  //   },
  //   users: {
  //     type: Number,
  //     default:0
  //   }
  // }
});

module.exports = mongoose.model("Post", postSchema);
