const cookieParser = require('cookie-parser');
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const app= express();

app.use(cookieParser());

// app.get("/", function(req,res){
//     // res.cookie("name", "Abhay");
//     bcrypt.genSalt(10, function(err, salt) {
//         bcrypt.hash("Hello", salt, function(err, hash) {
//             console.log(hash);
//         });
//     });
//     res.send("hey");
// })
// app.get("/", function(req,res){
//     bcrypt.compare("Hello", "$2b$10$qdhsdoL/VYL6rmbSbt7La.2IsFXVKa/cdisZUPLOhhnoQcJTYTbVK", function(err, result) {
//         console.log(result);
//     });
//     res.send("Working");
// })

app.get("/", function(req,res){
    let token = jwt.sign({ email: "abhay@sample.com" }, 'secret')
    res.cookie("token", token);
    res.send("Done");
})

app.get("/read",function(req,res){
   let data = jwt.verify(req.cookies.token,'secret');
   console.log(data);
    
})

// app.get("/read", function(req,res){
//     // console.log(req.cookies);
//     res.send("Read");
// })

app.listen(3000);
