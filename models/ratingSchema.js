const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ratingSchema = new Schema({
    imageId :{
        type : Schema.Types.ObjectId, 
        ref : 'Image'
    },
    userId : {
        type : Schema.Types.ObjectId,
        ref : 'User'
    },
    rating :{
        type : Number
    },
    ratingId :{
        type : Schema.Types.ObjectId
    }
});
module.exports = mongoose.model('Rating', ratingSchema);