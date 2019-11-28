const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const avgRatingSchema =  new Schema({
    _id : {
        type: Schema.Types.ObjectId,
        ref : 'Image'
    },
    avgRating : {
        type : Number
    }
});
module.exports = mongoose.model("avgRating", avgRatingSchema);