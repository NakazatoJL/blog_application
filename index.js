import bodyParser from "body-parser";
import express from "express";

const app = express();
const port = 3000;

class Post{
    constructor(title, content, id){
        this.id = id||posts.length;
        this.title = title;
        this.shortContent = content.slice(0, 30);
        this.content = content.slice(30);
        this.htmlShortContent = "<p>" + content.slice(0, 30);
        this.htmlShortContent = this.htmlShortContent.replace(/\n/g, "</p><p>")
        this.htmlContent = content.slice(30) + "</p>";
        this.htmlContent = this.htmlContent.replace(/\n/g, "</p><p>")
        this.more = "false";
    }
}

var posts = [];
var faqExpand = [];

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

for (let i = 0; i < 4; i++) {
    faqExpand[i] = "true";
}

app.get("/", (req, res)=>{
    if(posts.length > 0)
    {
        res.render("./index.ejs", {posts});
    }else {
        res.render("./index.ejs");
    }
});

app.get("/about", (req, res)=>{
    res.render("./about.ejs");
});

app.get("/faq", (req, res)=>{
    res.render("./faq.ejs", {faqExpand});
});

app.get("/contact", (req, res)=>{
    res.render("./contact.ejs");
});

app.post("/submit", (req, res) =>{
    let title = req.body.fTitle;
    let content = req.body.fContent;

    var newPost = new Post(title, content);
    posts.push(newPost);
    res.render("./index.ejs", {posts});
});

app.post("/submitEdit", (req, res) =>{
    let title = req.body.fTitle;
    let content = req.body.fContent;

    var newPost = new Post(title, content, req.body.post_id);
    posts[req.body.post_id] = newPost;
    res.render("./index.ejs", {posts});
});

app.post("/edit", (req, res) =>{
    let edit = req.body.post_id;
    console.log("Edit" + req.body.post_id);
    res.render("./index.ejs", {posts, edit});
});

app.post("/cDelete", (req, res) =>{
    let del = req.body.post_id;
    res.render("./index.ejs", {posts, del});
});

app.post("/delete", (req, res) =>{
    let postsBackUp = posts;
    posts = [];
    for (let i = 0; i < (postsBackUp.length); i++) {
        if(i > req.body.post_id || i < req.body.post_id){
            posts.push(postsBackUp[i]);
        }
    }
    if(posts.length > 0){
        for (let i = 0; i < posts.length; i++) {
            posts[i].id = i; 
        }
    }
    else{
        console.log("No posts");
    }
    
    console.log("Delete" + req.body.post_id);
    res.render("./index.ejs", {posts});
});

app.post("/readmore", (req, res) =>{
    posts[req.body.post_id].more = req.body.read_more;
    console.log("Read more" + req.body.post_id +req.body.read_more);
    res.render("./index.ejs", {posts});
});

app.post("/expand", (req, res) =>{
    faqExpand[req.body.post_id] = req.body.expand;
    console.log("Expand" + req.body.post_id +req.body.expand);
    res.render("./faq.ejs", {faqExpand});
});

app.listen(port, ()=>{
    console.log(`Listening to port ${port}.`);
});

