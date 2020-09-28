const jwt =  require('jsonwebtoken');
const config = require('config');


 const auth =  async (req, res, next) => {
    
    const token = req.header('Authorization') && req.header('Authorization').replace('Bearer ', '')


    if(!token) {
        return res.status(401).json({msg: 'No token, authoziration failed'})
    }
    try {
       
        const decoded = jwt.verify(token, config.get('jwtSecret'))
        //console.log

        /// if not define payload : user {...} we must find user by id
        // const user = await User.findOne({ _id: decoded._id })

        // if (!user) {                                          
        //     throw new Error()
        // }
        console.log('haha',decoded)
        req.user = decoded.user
      
        next()
    } catch(e) {
        res.status(401).send({error: 'Authoziration failed'})
        console.log(e)
    }
 


}

module.exports = auth