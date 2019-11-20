const mongoose = require("mongoose");

const imgSchema = mongoose.Schema({
    userID :{
        type : Object,
        required :true
    },
    imageURL:{
        type: String,
        required: true
    },
    created_at:{
        type: Date,
        value: Date.now
    },
    edited_at: {
        type: Date,
        value: Date.now
    },
    deleted_at:{
        type: Date,
        value: Date.now
    }
});

module.exports = mongoose.model('Image',imgSchema);


//pambutngi ni og CREATEDAT, EDITEDAT, DELETEDAT puro na timestamp and TYPE  kay DATE ang VALUE kay DATE.NO