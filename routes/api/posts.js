const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const auth = require("../../middleware/auth");
const User = require("../../models/User");
const Profile = require("../../models/Profile");
const Post = require("../../models/Post");
const { remove } = require("../../models/Post");


// create post
router.post("/", [auth, [
    check('text', 'Text is required').not().isEmpty()
]], async(req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).send({errors: errors.array()});
    }

    try {
        const user = await User.findById(req.user.id).select('-password')

        let newPost = await Post.findOne({text: req.body.text})
        if(newPost) {
           return  res.status(400).json({errors: [{msg : 'Post title already exists'}]})
        }

         newPost = new Post({
            text: req.body.text,
            name: user.name,
            avatar: user.avatar,
            user: req.user.id
        })

        await newPost.save()
        res.send(newPost)
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Server error')
    }
});

//get all posts
router.get('/all', auth, async(req,res) => {
    try {
        const post = await Post.find().sort({date: -1})
        if(!post) {
            return res.status(400).send('No post found')
        }
        res.send(post)
    } catch (error) {
        console.log(error.message)
        res.status(500).send('Server error')
    }
})

//get post by id
router.get('/:id', auth, async(req,res) => {
    try {
        const post = await Post.findById(req.params.id)
        if(!post) {
            return res.status(400).send('No post found')
        }
        res.send(post)
    } catch (error) {
        if(error.kind === "ObjectId") {
            return res.status(400).send('No post found')

        }
        console.log(error.message)
        res.status(500).send('Server error')
    }
})

//delete post by id

router.delete('/:id', auth, async(req,res) => {
    try {

        const post = await Post.findById(req.params.id);

        if(!post) {
            return res.status(404).send('No post found')
        }

        if(post.user.toString() !== req.user.id) {
            return res.status(401).send('Authorization failed')
        }

        await post.remove();

        res.send({msg: 'Delete success', post})
        
    } catch (error) {
        if(error.kind === 'ObjectId') {
                return res.status(404).send('No post found')
        }
        console.log(error.message),
        res.status(500).send('Server error')
    }
})

//like
router.put('/like/:id', auth, async(req,res) => {
    try {
        const post = await Post.findById(req.params.id)

        if(post.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
            return res.status(400).send({msg:'You have already liked it' })
        }

        post.likes.unshift({user: req.user.id})
        await post.save()
        res.send(post.likes)
    } catch (error) {
        console.log(error.message),
        res.status(500).send('Server error')

    }
})

//dislike
router.put('/unlike/:id', auth, async(req,res) => {
    try {
        const post = await Post.findById(req.params.id)

        if(post.likes.filter(like => like.user.toString() === req.user.id).length = 0) {
            return res.status(400).send('You have liked it yet')
        }

        const removeIndex = post.likes.map(like => like.user).indexOf(req.user.id)
        post.likes.splice(removeIndex, 1)

        await post.save()
        res.send(post.likes)
    } catch (error) {
        console.log(error.message),
        res.status(500).send('Server error')

    }
})

//put comment
router.put("/comment/:id", [auth, [
    check('text', 'Text is required').not().isEmpty()
]], async(req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).send({errors: errors.array()});
    }

    try {
        const user = await User.findById(req.user.id)
        const post = await Post.findById(req.params.id)

        if(!post) {
           return  res.status(400).json({errors: [{msg : 'Post not found'}]})
        }

        const comment = {
            text: req.body.text,
            name: user.name,
            avatar: user.avatar,
            user: req.user.id
        }

        post.comment.unshift(comment)

        await post.save()
        res.send(post)
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Server error')
    }
});


//delete comment
router.delete('/comment/:id/:commentId', auth, async (req,res) => {

    try {
        const post = await Post.findById(req.params.id)
        if(!post) {
            return res.status(404).send('Post not found')
        }

        //check comment exist
        const comment = post.comment.find(e => e._id.toString() === req.params.commentId)
        if(!comment) {
            return res.status(404).send('Comment not found')
        }

        //check user authorize
        if(comment.user.toString() !== req.user.id) {
            return res.status(401).send('Authorization failed')
        }

        const removeIndex = post.comment.map(e=>e.user).indexOf(req.user.id)
        post.comment.splice(removeIndex,1)

        await post.save();

        res.send(post)

    } catch (error) {
        console.log(error.message)
        res.status(500).send('Server error')
    }
})


module.exports = router;
