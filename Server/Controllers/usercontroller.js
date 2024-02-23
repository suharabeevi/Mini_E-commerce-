const {User,validate} =require('../model/UserSchema')
const bcrypt = require('bcrypt')

module.exports = {

    usersignup :  async(req,res)=>{
    try{
       // console.log(req.body);
    const {error} =validate(req.body);
if(error)
return res.status(400).send({message:error.details[0].message})
const user= await User.findOne({email:req.body.email});
if(user)
    return res
.status(409)
.send({message:"User with given mailid Already exist"})
const salt = await bcrypt.genSalt(Number(process.env.SALT))
const hashpassword= await bcrypt.hash(req.body.password,salt)

await User.create({...req.body,password:hashpassword})

res.status(201).send({message:"User Created Successfully"})
    }catch(error){
        return res.status(500).send({message:"Internal Server Error"})

    }
},

};
