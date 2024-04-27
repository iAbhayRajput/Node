const cookieParser = require('cookie-parser');
const express = require('express');
const app = express();
const path = require('path');
const userModel = require("./models/user");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Console } = require('console');

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,'public')));
app.use(cookieParser());

app.get("/",(req,res) =>{
res.render('index');
});

app.post("/create",(req,res) =>{
let {username, email, password , age} = req.body;

    bcrypt.genSalt(10 , (err,salt) => {
         bcrypt.hash(password, salt, async (err,hash) =>{
             let createdUser =  await userModel.create({
                username,
                 email,
                password: hash,
                age
            });

            let token = jwt.sign({email}, "secret");
            res.cookie("token", token);

            res.send(createdUser);
        })
    })
});

app.get("/login", (req,res) => {
    res.render("login");
})

app.post("/login", async (req,res) => {
   let user = await userModel.findOne({email: req.body.email});
   if(!user) return res.send("Something went wrong");

   bcrypt.compare(req.body.password, user.password, function(err,result){
    // console.log(result);
    if (result){ 
        let token = jwt.sign({email:user.email}, "secret");
        res.cookie("token", token);
    
        res.send("yes you can login");
    }
    else res.send("Something went wrong");
   })
})

app.get("/logout", (req,res) => {
    res.cookie("token", "");
    res.redirect("/");
})

app.listen(3000);
