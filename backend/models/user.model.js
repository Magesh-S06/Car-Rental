import mongoose from "mongoose"
import jwt from 'jsonwebtoken';
import Joi from "joi";
import passwordComplexity from "joi-password-complexity";

const userSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    cart: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'CarData',
    }],
    fav: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'CarData',
    }]
})

userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({_id: this._id}, process.env.JWT_KEY,{expiresIn:"7d"})
    console.log(token)
    return token
}

const User = mongoose.model('User', userSchema)


export const validate = (data) =>{
    const schema = Joi.object({
        firstName: Joi.string().required().label("First Name"),
        lastName: Joi.string().required().label("Last Name"),
        email: Joi.string().email().required().label("Email"),
        password: passwordComplexity().required().label("Password")
    })
    return schema.validate(data)
}

export default User