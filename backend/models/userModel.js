const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    f_name:{
        type:String,
        required:true,
    },
    l_name:{
        type:String,
        required:true,
    },
    dob:{
        type:String,
        required:true,
    },
    gender:{
        type: String,
        required: true,
    },
    m_mail:{
        type: String,
        required: true,
    },
    password:{
        type: String,
        required: true,
    },
    image:{
        type: String,
        required: false,
        default: null,
    },
    otp:{
        type:Number,
        default:null,
    }
},
{
    timestamps: true,
});

module.exports = mongoose.model("Users",userSchema);