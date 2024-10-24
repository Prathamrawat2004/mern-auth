import bcryptjs from 'bcryptjs';
import User from '../models/user.js'; 

export const test = (req,res)=>{
    res.json({
        message: 'API is working!',
    });
}

// updating user
export const updateUser = async (req, res, next)=>{
    if(req.user.id !== req.params.id){
        return res.status(401).json("You can only update your account!");
    }

    // if the person is real
    try {
        if(req.body.password){
            req.body.password = bcryptjs.hashSync(req.body.password, 10);
        }

        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            {
                $set:{
                    username: req.body.username,
                    email: req.body.email,
                    password: req.body.password,
                    profilePicture: req.body.profilePicture,
                }
            }, 
            {new: true}

        );
        // seperating password from updated user doc
        const {password, ...rest} = updatedUser._doc;
        res.status(200).json(rest); 
        
    } catch (error) {
         
    }
}