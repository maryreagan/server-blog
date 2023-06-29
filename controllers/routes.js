const router = require("express").Router();
let db = "./api/blog.json";
const fs = require("fs");
const { read, save } = require("../functions/rw");
const { v4: uuidv4 } = require("uuid");

let blogPostArray = []

//Get all posts
router.get("/all", (req, res) => {
    console.log(blogPostArray)
    blogPostArray = read(db)
    console.log(blogPostArray)

    try {

        res.status(200).json({
            message: "Got all blog posts",
            blogPostArray
        });
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
})

//Get one post by id
router.get("/one/:id", (req, res) => {
    blogPostArray = read(db);

    try {
        let id = req.params.id;

        let index = blogPostArray.findIndex(
            (blogPost) => blogPost.post_id == id
        );

        res.json({
            message: "Single Blog Post",
            blogPost: blogPostArray[index],
        });
    } catch (error) {
        res.json({
            message: error.message,
        });
    }
});

//Create a post
router.post("/add", (req, res) => {
    blogPostArray = read(db);


    try {
        const { post_id, title, author, body } = req.body; // Keys out of req.body
        const blogPostObject = {
            // posts are Objects
            post_id: uuidv4(),
            title: title.toUpperCase(),
            author: author,
            body: body,
        };
        blogPostArray.push(blogPostObject)
        save(blogPostArray)
        console.log(blogPostObject)
        res.json({
            message: "Post added",
            blogPostObject
        })
    } catch (error) {
        res.json({ message: error.message });
    }
})

//Update a post
router.put("/:id", (req, res) => {
    blogPostArray = read(db)
    try{
        let id = req.params.id
        let { title, author, body } = req.body
        let result = blogPostArray.findIndex(i => i.post_id == id)
        if(result == -1){
            res.status(404).json({
                message: `Post not found`
            })
        }
        blogPostArray[result].title = title ?? blogPostArray[result].title
        blogPostArray[result].author = author ?? blogPostArray[result].author
        blogPostArray[result].body = body ?? blogPostArray[result].body
        save(blogPostArray)
        res.status(200).json({
            message: `Post Updated`,
            blogPostArray
        })
    } catch(err){
        res.status(500).json({
            message: `${err}`
        })
    }
})

//Delete post by id
router.delete("/:id", (req, res) => {
    blogPostArray = read(db)
    try{
        let id = req.params.id
        blogPostArray = blogPostArray.filter(i => i.post_id != id)
        save(blogPostArray)
        res.status(200).json({
            message: `Post deleted`,
            blogPostArray
        })
    } catch(err){
        res.status(500).json({
            message: `${err}`
        })
    }
})

module.exports = router;
