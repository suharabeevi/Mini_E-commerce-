require('dotenv').config();
const express =require('express')
const app= express();
const cors= require('cors')
const Connection = require("./Connection")

Connection()

//middleware
app.use(express.json())
app.use(cors())

const Port =process.env.PORT || 5000
app.listen(Port,()=>{
    console.log(`Server Listening on ${Port}...`);
})