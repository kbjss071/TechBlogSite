const router = require('express').Router();
const {Post} = require('../../models');
const withAuth = require('../../utils/auth')

// Create a new post while user is logging in
router.post('/', withAuth, async(req, res)=> {
    console.log(req.body);

    try {
        const blogData = await {
            user_id: req.body.user_id,
            title: req.body.title,
            content: req.body.content,
        }

        await Post.create(blogData);

        res.status(200).json({ msg: blogData})
    }
    catch(err) {
        res.status(500).json(err);
    }
})

// Update a post while user is logging in
router.put('/:id', withAuth, async(req, res)=> {
    Post.update(req.body, {
            where: {
                id: req.params.id
            }
        }
    ).then((updatedPost)=> {
        res.status(200).json(updatedPost);
    }).catch((err)=>{
        console.error(err);
        res.status(500).json(err);
    })
})

// Delete a post while user is logging in
router.delete('/:id', withAuth, async (req, res) =>{
    Post.destroy({
        where: {id: req.params.id}
    })
    .then((deletedPost)=>{
        res.json(deletedPost);
    })
    .catch((err)=>{
        console.log(err);
        res.json(err);
    })
})