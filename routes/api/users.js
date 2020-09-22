const express = require('express');
const router = express.Router();
const {check, validationResult} = require('express-validator');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs')
const config = require('config')
const jwt = require('jsonwebtoken')
const User = require('../../models/User')
// router.get('/', (req,res) => res.send('Get from user route'))

router.post(
    '/',
    [
        check('name', 'Name is required').not().isEmpty(),
        check('email', 'Email is invalid').isEmail(),
        check('password','Password is require for 6 characters').isLength({min: 6})
      
    ], 
    async (req,res) => {
        //Validate input data
       const errors = validationResult(req);
       const {name, email, password} = req.body
       if(!errors.isEmpty()) {
           return res.status(400).json({error: errors.array()})
       }

       try {
           //Check email exists
           let user = await User.findOne({email})
           if(user) {
               return res.status(400).json({errors: [{msg : 'User already exists'}]})
           }

           //Get Users gravatar

           const avatar = gravatar.url(email, {
               s: '200',
               r: 'pg',
               d: 'mm'
              
           }, true)
           user = new User ({
            name, email, password,
               avatar
           })
           //Encrypt password
           const salt = await bcrypt.genSalt(10);
           user.password = await bcrypt.hash(password, salt)

           //return jsonwebtoken

           const payload = {
               user: {
                   id: user.id
               }
           }

           jwt.sign(payload, config.get('jwtSecret'), {expiresIn: 360000}, (error, token) => {
               if(error) throw error;
                res.json({token})
            //    res.json({token});
           })

           await user.save();

        res.status(201).send('User registered')
       } catch(e) {
           console.log(e.message)
           res.status(500).send('Server error')
       }
      
})

router.get('/all', async (req,res) => {
    try {
        const user = await User.find()
        res.send(user)
    } catch (error) {
        console.log(error.message)
        res.status(500).send('Server error')
    }
})

router.get('/:id', async (req,res) => {
    try {
        const user = await User.findById(req.params.id)
        res.send(user)
    } catch (error) {
        console.log(error.message)
        res.status(500).send('Server error')
    }
})
module.exports = router;