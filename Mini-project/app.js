const cookieParser = require('cookie-parser');
const express = require('express');
const app = express();
const path = require('path');
const userModel = require("./models/user");
const postModel = require("./models/post");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,'public')));
app.use(cookieParser());

app.get("/", (req,res) =>{
    // res.send("Hey There");
    res.render("index");
})

app.get("/login", (req,res) =>{
    res.render("login");
})

app.get("/profile",isLoggedIn, (req,res) =>{
    console.log(req.user);
    res.render("login");
})

app.post("/register", async(req,res) =>{
    let {email, name, password, age, username} = req.body;
    let user = await userModel.findOne({email});
    if (user) return res.status(500).send("User ALready registered");
    
    bcrypt.genSalt(10, (err, salt) =>{
        bcrypt.hash(password, salt, async(err, hash) => {
            let user = await userModel.create({
                username,
                email,
                name,
                age,
                password:hash
            });
            
            let token = jwt.sign({email: email, userid: user._id}, "shhhh");
            res.cookie("token", token);
            res.send("registered");
        })
    })
})

app.post("/login", async(req,res) =>{
    let {email, password} = req.body;
    let user = await userModel.findOne({email});
    if (!user) return res.status(500).send("Something Went Wrong");
    
    bcrypt.compare(password, user.password, function(er, result) {
        if(result){
            let token = jwt.sign({email: email, userid: user._id}, "shhhh");
            res.cookie("token", token);
         res.status(200).send("you can login");
        }
        else res.redirect("/login");
    })
})

app.get("/logout", (req,res) =>{
    res.cookie("token","");
    res.redirect("/login");
})

function isLoggedIn(req, res, next){
    if(req.cookies.token === "") res.send("You must be logged in");
    else{
      let data = jwt.verify(req.cookies.token,"shhhh");
      req.user= data ;
      next();
    }
}

app.listen(3000,()=>{
    console.log("Server is running on port 3000");
});
