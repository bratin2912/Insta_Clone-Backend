const app = require("./app");
// const dotenv = require("dotenv");
const mongoose = require("mongoose");
const port=8000 || process.env.PORT;
// dotenv.config()
mongoose.set('strictQuery', true);
// connection to mongoDB database with mongoose
mongoose.connect('mongodb+srv://bratin:bratin@cluster0.ht7znzj.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
.then(()=>{
    console.log("Connected to database");
})
.catch(()=>{
    console.log("Connection failed")
})

app.listen(port,()=>{
    console.log("Server is running")
})