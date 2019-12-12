const mongoose = require("mongoose");
require("./PostSchema")
const UserSchema = mongoose.Schema({
    FirstName: {
        type: String,
        required: true
    },
    MiddleName: {
        type: String,
        required: true
    },
    LastName: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    Email: {
        type: String,
        required: true
    },
    Password: {
        type: String,
        required: true
    },
    posts: {
        type: [mongoose.Types.ObjectId],
        ref: "Post",
        default: []
    },
    Birthdate: {
        month: String,
        day: Number,
        year: Number
    },
});
module.exports = mongoose.model("User", UserSchema);