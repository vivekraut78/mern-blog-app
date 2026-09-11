const express = require('express'); 
const router = express.Router(); 
const Comment = require('../models/Comment'); 
const verifyToken = require('../middleware/auth');


router.post('/:postId', verifyToken, async (req, res) => 
    { 
        try 
        { 
            const { text } = req.body; 
            const comment = await Comment.create({ text, author: req.userId, post: req.params.postId }); 
            res.status(201).json(comment); 
        } 
        catch (err) 
        { 
            res.status(500).json({ error: err.message }); 
        } 
    });

router.get('/:postId', async (req, res) => 
    { 
        try 
        { 
            const comments = await Comment.find({ post: req.params.postId }).populate('author', 'name email').sort({ createdAt: 1 }); 
            res.json(comments); 
        } 
        catch (err) 
        { 
            res.status(500).json({ error: err.message }); 
        } 
    });


router.delete('/:id', verifyToken, async (req, res) => 
    { 
        try 
        { 
            const comment = await Comment.findById(req.params.id); 
            if (!comment) 
            { 
                return res.status(404).json({ error: 'Comment not found' }); 
            } 
            if (comment.author.toString() !== req.userId) 
            { 
                return res.status(403).json({ error: 'Not authorized to delete this comment' }); 
            }
            await comment.deleteOne(); 
            res.json({ message: 'Comment deleted successfully' }); 
        } 
        catch (err) 
        { 
            res.status(500).json({ error: err.message }); 
        }
    });

module.exports = router;
