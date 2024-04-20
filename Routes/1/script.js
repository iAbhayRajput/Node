const express = require('express')
const app = express()

//using middleware for json to blob conversion and vice versa 
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//function here act as a middleware 
app.get('/', function (req, res) {
  res.send('Hey There!, You are at Home')
})
app.get('/profile', function (req, res) {
  res.send('Hey There!, You are at profile')
})

app.listen(3000)
