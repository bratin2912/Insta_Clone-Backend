const mongoose=require("mongoose");

const userSchema=new mongoose.Schema({
    file_name:String,
    author:String,
    location:String,
    description:String,
    likes:Number,
    postedAt: { 
        type: String,
        default: () => new Date().toString().split('T')[0]
    }
});

const user=mongoose.model("user",userSchema);

module.exports=user;