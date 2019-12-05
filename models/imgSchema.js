const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const imgSchema = new Schema({
    userId :{
        type : Schema.Types.ObjectId,
        ref: 'User'
    },
    imageURL: {
        type: String,
        default: "none",
        required: true
    },
    imageData : {
        type : String,
        required : true
    },
    imageDescription: {
        type: String,
        // required: true
    },
    created_at: {
        type: Date,
    },
    edited_at: {
        type: Date,
    },
    deleted_at: {
        type: Date,
    },
    ratings : {
        type: Schema.Types.ObjectId,
        ref : 'Rating'
    },
    rating : {
        type : Number,
        // required : true
    },
});

module.exports = mongoose.model('Image', imgSchema);


//pambutngi ni og CREATEDAT, EDITEDAT, DELETEDAT puro na timestamp and TYPE  kay DATE ang VALUE kay DATE.NO