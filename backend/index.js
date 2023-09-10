const express=require('express');
const app=express();
const dotenv=require('dotenv').config();
const mongoose=require('mongoose')
const router=require('./routes/route')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const cors=require('cors');

const {body,check,validationResult } = require('express-validator');

// app.get('/',(req,res)=>{
//     res.json({
//         message:"Hello VR"
//     })
// });
app.use(cookieParser())
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/api/',router);
mongoose.connect(process.env.mongoUrl).then(()=>{
    app.listen(process.env.PORT,()=>{
        console.log('server running on port ',process.env.PORT);

    })
}).catch((error)=>{
    console.log('error on database',error)

})

