import User from "./auth.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const signUpUser= async(data)=>{
    const {name,email,password} = data;

    const isexistingUser = await User.findOne({email});
    if(isexistingUser ){
        throw new Error("user already exists");
    }

    const hashedPassword = await bcrypt.hash(password,10);

    const user = await User.create(
        {name,email,password:hashedPassword}
    );

    return user;
}

export const loginUser = async(data)=>{
    const {email,password} = data;

    const user = await User.findOne({email});
   
    if(!user) {
        throw new Error("invalid credentials");
    }

    const isMatch = await bcrypt.compare(password,user.password);
    if(!isMatch){
        throw new Error("invalid password")
    }

    const token = jwt.sign(
        {id:user._id},
        process.env.JWT_SECRET,
        {expiresIn:"7d"}
    );

    return {user,token};
}