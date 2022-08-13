const router = require('express').Router();
const {User, Post, Comment} = require('../../models');

router.get('/', async (req, res) => {
    let userData = await User.findAll();
    let users = userData.map(user => user.get({plain: true}));

    res.json(users);
})

router.post('/', async (req, res) => {
    try {
        const newUser = await {
            username: req.body.username,
            password: req.body.password
        }
        const createUser = User.create(newUser);

        if(createUser) {
            req.session.save(()=>{
                req.session.user_id = createUser.id
                req.session.logged_in = true

                res.status(201).json({msg: createUser})
            })
        }
    }
    catch (err) {
        res.status(200).json(err);
    }
})