const express = require('express');
const auth = require('../../middleware/auth');
const User = require('../../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config')
const router = express.Router();

 
router.get('/', auth, async (req,res) => {
    try {
        const user = await User.findById(req.user.id).select('-password')
        res.json(user)
    } catch(e) {
        console.log(e.message)
        res.status(500).send({error: 'failed'})
    }
    
})

router.post('/', async (req,res) => {
    const {email, password} = req.body
   


    try {
        const user = await User.findOne({email});
        if(!user) {
          return  res.status(400).send({errors: [{msg : 'No User found'}]})
        }
    
        const isMatch = await bcrypt.compare(password, user.password)
    
        if(!isMatch) {
          return  res.status(400).send({errors: [{msg : 'Password is wrong'}]})
        }

        const payload = {
            user: {
                id: user.id
            }
        }

         jwt.sign(payload, config.get('jwtSecret'), {expiresIn: 100}, (error, token) => {
            if(error) res.send(error);
            res.status(200).send({user,token})
        })

        //res.send({user,token})


    } catch(e) {
        res.status(500).send({error: "Login failed"})
    }
})

module.exports = router;
