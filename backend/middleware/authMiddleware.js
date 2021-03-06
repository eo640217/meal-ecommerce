 import jwt from 'jsonwebtoken';
 import User from '../models/userModel.js';
 import AsyncHandler from 'express-async-handler'; 

 const protect = AsyncHandler( async (req, res, next) => {
     let token 
     if (req.headers.authorization && req.headers.authorization.startsWith('Bearer'))
        {
            try{
                token = req.headers.authorization.split(' ')[1]
                const decoded = jwt.verify(token, process.env.JWT_SECRET);
                req.user = await User.findById(decoded.id).select('-password');
            }
            catch(err){
                console.error(err);
                res.status(401);
                throw new Error('Not Authorized. Token failed')
            }
        }
        
    if (!token){
        res.status(401);
        throw new Error('Not Authorized')
    }
     next()
 })
 export {protect}