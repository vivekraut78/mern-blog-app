const express = require("express");
const router = express.Router();
const Post = require("../models/Post");
const verifyToken = require("../middleware/auth");

//Create post route(protected)
router.post("/", verifyToken, async (req, res) => 
{
    try 
    {
        const { title, content, tags } = req.body;
        const post = await Post.create
        ({
            title,
            content,
            tags,
            author: req.userId,
        });
        res.status(201).json(post);
    } 
    catch (err) 
    {
        res.status(500).json({ error: err.message });
    }
});

//Get all posts (public)
router.get("/", async (req, res) => 
{
    try 
    {
        const posts = await Post.find()
        .populate("author", "name email")
        .sort({ createdAt: -1 });
        res.json(posts);
    } 
    catch (err) 
    {
        res.status(500).json({ error: err.message });
    }
});


//Get a single post by ID (public)
router.get("/:id", async (req, res) => 
{
    try 
    {
        const post = await Post.findById(req.params.id).populate
        (
            "author",
            "name email",
        );
        if (!post) 
        {
            return res.status(404).json({ error: "Post not found" });
        }
        res.json(post);
    } 
    catch (err) 
    {
        res.status(500).json({ error: err.message });
    }
});
module.exports=router;

