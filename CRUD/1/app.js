const express= require('express');
const app = express();
const userModel = require('./usermodel');

app.get('/',(req,res)=>{
    res.send("hey");
})

app.get('/create',async (req,res)=>{
    let createduser = await userModel.create({
        name:"Harsh",
        username:"Harsh",
        email:"harsh@gmail.com"
    })
    res.send(createduser);
})

app.get('/update',async (req,res)=>{
    let updateduser = await userModel.findOneAndUpdate({username:"Abhay"},{name:"Abhay Rajput"},{new:true})
    res.send(updateduser);
})

app.get('/read',async (req,res)=>{
    let users = await userModel.find();
    res.send(users);
})

app.get('/delete',async (req,res)=>{
    let duser = await userModel.findOneAndDelete({username:"Abhay"});
    res.send(duser);
})


app.listen(3000);
