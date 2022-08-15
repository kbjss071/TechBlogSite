const router = require('express').Router();
const Comment = require('../../models/Comment');
const withAuth = require('../../utils/auth');

// Create a comment
router.post('/', async(req, res)=> {
    try {
        const newComment = {
            content: req.body.content,
            user_id: req.body.user_id,
            post_id: req.body.post_id,
        };

        await Comment.create(newComment);
        res.status(200).json({msg: newComment})
    } catch(err){
        console.log(err);
        res.status(500).json(err);
    }
})

// Update Comment
router.put('/:id', async(req, res) => {
    Comment.update(req.body, {
        where: {id: req.params.id}
    })
    .then((updated)=> {
        res.json(updated)
    })
    .catch((err)=>{
        console.error(err);
        res.json(err);
    })
})

// Delete Comment
router.delete('/:id', async(req, res)=>{
    Comment.destroy({
        where: {id: req.params.id}
    })
    .then((deleted)=>{
        res.json(deleted);
    })
    .catch((err)=>{
        console.log(err);
        res.json(err);
    })
})