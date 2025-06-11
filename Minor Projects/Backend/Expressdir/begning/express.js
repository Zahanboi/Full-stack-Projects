const { log } = require("console");
const express = require("express");
const app = express();
exports.app = app;

const path = require("path");

app.use(express.static(path.join(__dirname , "/public")));
app.use(express.static(path.join(__dirname , "/public/js")));// for folder inside public

app.set("views", path.join(__dirname , "/views"));

app.set("view engine" , "ejs");

let port = 3000;

app.listen (port , ()=> {
   console.log(`this known as ${port}`);
})// run code and it will start listening to port code 


app.get("/ig/:username" , (req , res)=>{
   const {username} = req.params;
   const instaData = require("./data.json");
   
   const data = instaData[username];
   if (data == undefined) {
      res.send("No such user found");  
      return;
   }
   console.log(data);
   
   res.render("instagram.ejs" , {data});
})

app.post("/ig/:username" , (req , res)=>{
   const {username} = req.params;
   const instaData = require("./data.json");
   
   const data = instaData[username];
   if (data == undefined) {
      res.send("No such user found");  
      return;
   }
   console.log(data);
   
   res.render("instagram.ejs" , {data});
})




















































































// app.use((req , res) => {
//    // res.send("Hello World");
//    // console.log(req);
//    // console.log("new incoming request");
// });// as soon as someone access localhost:8080 its gets printed

// app.get("/username" , (req , res) => {
//    let username = req.params;
//    console.log(req.params);
   
//    res.send(`This is ${username}`);
// });



app.get("/rolldice" , (req , res) => {
   let num = Math.floor(Math.random()*6) + 1;
   res.render("home.ejs" , {diceVal:num})
});