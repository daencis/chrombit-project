const {User} = require('../models/index');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

class UserControl {
    static async registerUser (req, res, next){
        try {
            const {email, password, username} = req.body
            if(!email || !password || !username) throw {name: "BAD_REQUEST"}

            const newUser = await User.create({
                username: username,
                email: email,
                password: password
            })

            return res.status(201).json(newUser)
        } catch (error) {
            if(error.name == "BAD_REQUEST"){
                return res.status(400).json({message: "Bad request"})
            }
            return res.status(400).json({message: error})
        }
    }

    static async loginUser (req, res, next){
        try {
            const {email, password} = req.body
            if(!email || !password) throw {name: "BAD_REQUEST"}
            
            const userLogin = await User.findOne({
                where:{
                    email: email
                }
            })
            
            if(!userLogin){
                return res.status(404).json({message: 'User not found'})
            }

            const validation = bcrypt.compareSync(password, userLogin.password)
            if(!validation) throw {name: "UNAUTHORIZED"}
    
            const payload = {
                id: userLogin.id,
                username: userLogin.username
            }
    
            const access_token = jwt.sign(payload, "sangatsangatrahasia")
    
            res.user = {
                id: userLogin.id,
                username: userLogin.username
            }
    
            res.status(200).json({access_token: access_token})
        } catch (error) {
            if(error.name == "UNAUTHORIZED"){
                res.status(401).json({message: "You are unauthorized"})
            }else if(error.name == "BAD_REQUEST"){
                res.status(400).json({message: "Bad request"})
            } else{
                res.status(500).json({message: "Something went down"})
            }
        }
    }
}

module.exports = UserControl