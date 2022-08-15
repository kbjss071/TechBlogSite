const router = require('express').Router();
const User = require('../../models/User');
const Post = require('../../models/Post');
const Comment = require('../../models/Comment')


// Get all users
// /api/users
router.get('/', async (req, res) => {
    // May need to add a line to include Post and Comment {include: {model: Post}...}
    let userData = await User.findAll({include: [{model: Post}, {model: Comment}]});
    let users = userData.map(user => user.get({plain: true}));

    res.json(users);
})


// Create a user
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

//login
// /api/users/login
router.post('/login', async (req, res) => {
    try {
        const UserData = await User.findOne({
            where: {
                username: req.body.username
            }
        })
        // if username is incorrect
        if(!userData){
            res.status(400).json({ msg: 'Incorrect username or password.'})
            return;
        }

        const verified = await userData.checkPassword(req.body.password);

        // if password is incorrect
        if(!verified){
            res.status(400).json({msg: 'Incorrect username or password.'})
            return;
        }

        req.session.save(()=> {
            req.session.logged_in = true;
            req.session.user_id = userData.id;
            res.status(200).json({user: UserData, message: 'You are logged in!'})
        })
    } catch (err){
        console.log(err);
        res.status(500).json(err);
    }
})

// logout
router.delete('/logout', async (req, res) => {
    try {
        if(req.session.logged_in){
            req.session.destroy(()=>{
                res.status(204).end();
            })
        } else {
            res.status(404).end();
        }
    }
    catch (err) {
        res.status(500).json(err);
    }
})

// update user
router.put('/:id', async(req, res)=> {
    User.update(
        {
            username: req.body.username,
            password: req.body.password
        },
        {
            where: {id: req.params.id},
            individualHooks: true
        }
    )
    .then ((updated)=> {
        res.json(updated);
    })
    .catch((err)=> {
        console.error(err);
        res.json(err);
    })
})

module.exports = router;