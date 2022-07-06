import Users from "../models/UserModel.js";
import bcrypt from "bcrypt";
import { generateAccessToken, generateRefreshToken } from "../helper/Token.js";

const getUsers = async(_, res) => {
    try {
        const users = await Users.findAll({
            attributes:['id','name','email']
        });
        res.json(users);
    } catch (error) {
        console.log(error);
    }
}

const Register = async(req, res) => {
    const { name, email, password, confirm_password } = req.body;
    if(password !== confirm_password){
        return res.status(400).json({
            message: "Password dan Confirm Password tidak cocok"
        });
    }
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);
    try {
        const user = await Users.create({
            name: name,
            email: email,
            password: hashPassword
        });

        const payload = {
            id: user.id, 
            name: user.name, 
            email : user.email
        }

        const accessToken = generateAccessToken(payload);
        const refreshToken = generateAccessToken(payload);
        await Users.update({refresh_token: refreshToken},{
            where:{
                id: user.id
            }
        });
        res.cookie('refreshToken', refreshToken,{
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000
        });
        res.status(200).json({ 
            user: payload,
            accessToken 
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Register failed'
        })
    }
}

const Login = async(req, res) => {
    try {
        const user = await Users.findOne({
            where:{
                email: req.body.email
            }
        });
        
        if(!await bcrypt.compare(req.body.password, user.password)){
            return res.status(400).json({
                message: "Wrong Password"
            });
        }

        const payload = {
            id: user.id, 
            name: user.name, 
            email : user.email
        }

        const accessToken = generateAccessToken(payload);
        const refreshToken = generateRefreshToken(payload);
        await Users.update({refresh_token: refreshToken},{
            where:{
                id: user.id
            }
        });
        res.cookie('refreshToken', refreshToken,{
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000
        });
        res.status(200).json({    
            user: payload,
            accessToken
        });
    } catch (error) {
        res.status(404).json({message:"Email tidak ditemukan"});
    }
}

const Logout = async(req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if(!refreshToken) return res.sendStatus(204);
    const user = await Users.findOne({
        where:{
            refresh_token: refreshToken
        }
    });
    if(!user) return res.sendStatus(204);
    const userId = user.id;
    await Users.update({refresh_token: null},{
        where:{
            id: userId
        }
    });
    res.clearCookie('refreshToken');
    return res.sendStatus(200);
}

export default { getUsers, Register, Login, Logout };