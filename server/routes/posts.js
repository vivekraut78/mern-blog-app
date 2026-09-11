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



//Update route(Put)
router.put('/:id', verifyToken, async (req, res) => 
{ 
    try 
    { 
        const post = await Post.findById(req.params.id); 
        if (!post) 
        { 
            return res.status(404).json({ error: 'Post not found' }); 
        } 
        if (post.author.toString() !== req.userId) 
        { 
            return res.status(403).json({ error: 'Not authorized to edit this post' }); 
        } 
        const { title, content, tags } = req.body; 
        if (title) post.title = title; 
        if (content) post.content = content; 
        if (tags) post.tags = tags; 
        await post.save(); 
        res.json(post); 
    } 
    catch (err) 
    { 
        res.status(500).json({ error: err.message }); 
    } 
});


//Delete post route
router.delete('/:id', verifyToken, async (req, res) => 
{ 
    try 
    { 
        const post = await Post.findById(req.params.id); 
        if (!post) 
        { 
            return res.status(404).json({ error: 'Post not found' }); 
        } 
        if (post.author.toString() !== req.userId) 
        { 
            return res.status(403).json({ error: 'Not authorized to delete this post' }); 
        } 
        await post.deleteOne();
        res.json({ message: 'Post deleted successfully' }); 
    } 
    catch (err) 
    { 
        res.status(500).json({ error: err.message }); 
    } 
});

module.exports=router;
