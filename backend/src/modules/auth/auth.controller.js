import { signUpUser,loginUser } from "./auth.service.js";
import { signupSchema,loginSchema } from "./auth.validation.js";

export const signup = async(req,res)=>{
    try {
        const parsed = signupSchema.parse(req.body);
        const user = await signUpUser(parsed);

        res.status(201).json({
            message:"user created successfully",
            user,
        });
    } catch (error) {
        res.status(400).json({error:error.message});
    }
};

export const login = async(req,res)=>{
    try {
        const parsed = loginSchema.parse(req.body);
        const result = await loginUser(parsed);

        res.status(200).json(result);

    } catch (error) {
        res.status(400).json({error:error.message});
    }
}