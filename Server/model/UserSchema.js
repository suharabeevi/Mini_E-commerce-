const { string } = require('joi')
const jwt =require('jsonwebtoken')
const mongoose = require('mongoose')
const passwordcomplexity =require('joi-password-complexity');
const Joi = require('joi');
const Userschema = new mongoose.Schema({
    username:{type:string,required:true},
    email:{type:string,required:true},
    password:{type:string,required:true}

});

Userschema.methods.generateAuthToken= function(){
    const token= jwt.sign({_id:this._id},process.env.JWT_KEY,{expiresIn:"7d"})
    return token
}
const User =mongoose.model("user",Userschema)
const validate = (data)=>{
    const Schema =Joi.object({
        username:Joi.string().required().label("username"),
        email:Joi.string().required().label("email"),
        password:passwordcomplexity().required().label("password")
    })
    return Schema.validate(data)
}
module.exports={User,validate}