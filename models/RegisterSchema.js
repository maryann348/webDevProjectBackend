const mongoose = require ("mongoose");

const RegisterSchema = mongoose.Schema({
    FirstName :{
        type : String,
        required
    },
    MiddleName :{
        type : String,
        required
    },
    LastName :{
        type : String,
        required
    },
    
})