const { log } = require("console");
const express = require("express");
const app = express();
const { v4: uuidv4 } = require('uuid');
var methodOverride = require('method-override')

const path = require("path");

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(methodOverride('_method'))

app.use(express.static(path.join(__dirname , "/public")));

app.set("views", path.join(__dirname , "/views"));

let port = 8080;

app.listen (port , ()=> {
   console.log(`this known as ${port}`);
})

// app.get("/register" , (req , res)=>{
//     res.render("request.ejs");
//     let {name , password} = req.query;
//     console.log(name , password);
// })

// app.post("/register" , (req , res)=>{
//     res.render("request.ejs");
//     const {name , password} = req.body;
//     console.log(name , password); 
// })



let posts = [
    {
        id: uuidv4(),
        username: "main",
        content: "nice first post"
    },
    
];

app.get("/posts" , (req , res) => {
    res.render("posts.ejs" , {posts});
 });
 
app.get("/posts/new" , (req , res) => {
    res.render("form.ejs");
 });
 
app.post("/posts" , (req ,res) => {
    const{username , content} = req.body;
    let id = uuidv4();// can't pass direct function there beacuase it have to be called
    posts.push({id , username , content});
    res.redirect("/posts");
});

app.get("/posts/:id" , (req , res) => {
    let{id} = req.params;
    let post = posts.find((p) => id === p.id);
    res.render("new.ejs", {post});
});

app.get("/posts/:id/edit" , (req , res) => {
    let { id } = req.params;
    let post = posts.find((p) => id === p.id);
    res.render("edit.ejs" , { post });
});

app.patch("/posts/:id" , (req , res) => { // need to send req on id because we are updating the content of that id so need id
    const{id} = req.params;
    const newContent = req.body.content;
    let post = posts.find((p) => id === p.id);
    post.content = newContent; // imp will not work if server is not restarted or page not loaded because id is changing every time we come to this page
    res.redirect("/posts");  
});

app.get("/posts/:id/delete" , (req , res) => {
    let { id } = req.params;
    let post = posts.find((p) => id === p.id);
    res.render("remove.ejs" , { post });
});

app.delete("/posts/:id" , (req , res) => {
    const{id} = req.params;
    const index = posts.findIndex((p) => id === p.id);
    if (index !== -1) {
        posts.splice(index, 1);
    }
    res.redirect("/posts");
});
