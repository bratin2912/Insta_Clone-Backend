const express=require("express");
const cors=require("cors");
const fileUpload=require("express-fileupload")
const app=express();

const userRoute=require("./routes/route");

app.use(fileUpload())

app.use(cors())

app.use(express.json());

app.use("/",userRoute);

module.exports=app;
