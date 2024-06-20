const express = require ("express")
const dotenv = require ("dotenv").config()

const port = process.env.port
const app = express()
const mongoose = require ("mongoose")

app.use(express.json())
const router = require(`./router/userRouter`)
app.use(router)

mongoose.connect(process.env.db).then(()=>{
    app.listen(port,()=>{
        console.log(`sever is listening to ${port}`);
    })
        console.log("DB connected successfully")
    }).catch((error)=>{
        console.log(`unable to connect to DB because ${error}`); 
    }) 
