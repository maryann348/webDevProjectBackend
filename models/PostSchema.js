const mongoose = require("mongoose");
require("./RegisterSchema")
//schema of a post
const postSchema = mongoose.Schema({
  userID: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true

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
  },
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