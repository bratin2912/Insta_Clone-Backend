const app = require("./app");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const port=8000 || process.env.PORT;
dotenv.config()
mongoose.set('strictQuery', true);
// connection to mongoDB database with mongoose
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
.then(()=>{
    console.log("Connected to database");
})
.catch(()=>{
    console.log("Connection failed")
})

app.listen(port,()=>{
    console.log("Server is running")
})