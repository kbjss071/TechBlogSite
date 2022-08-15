const router = require('express').Router();
const session = require("express-session");
const Post = require('../models/Post');
const User = require('../models/user');
const withAuth = require('../utils/auth');

// 
router.get("/post/:id", withAuth, async (req, res)=>{
    try {
        const postData = await Post.findByPk(req.params.id, {
            include: [{model: User, attribute: ["username"]},{model: Comment}]
        })
        
        // Get serialized data
        const post = postData.get({plain: true})
    }
    catch {

    }
})