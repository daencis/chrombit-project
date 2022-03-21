const {User, Blog} = require("../models/index")
const jwt = require("jsonwebtoken")

const authentication = async (req, res, next) =>{
    try{
        const {access_token} = req.headers
        if(!access_token){
            return res.status(400).json({message: 'please login first'})
        }
        const payload = jwt.verify(access_token, "sangatsangatrahasia")
        
        const user = await User.findOne({
            where:{
                id: payload.id,
                username: payload.username
            }
        })
        if(!user) throw {name: "USER_NOT_FOUND"}

        req.user = {
            id: user.id,
            email: user.email,
            username: user.username
        }

        next()
    }catch(err){
        console.log(err);
        if(err.name == "USER_NOT_FOUND"){
            res.status(401).json({msg: "User not found"})
        }else{
            res.status(500).json({msg: "Something went down"})
        }
    }
}

const authorization = async (req, res, next) =>{
    try{
        const id = +req.params.id
        const blog = await Blog.findOne({
            where:{
                UserId: req.user.id,
                id: id
            }
        })

        if (!blog) {
            throw {name:"BLOGS_NOT_FOUND"}
        }
        
        if (blog.UserId == req.user.id) {
            next()
        }else {
            throw { name: "UNAUTHORIZED"}
        }
    }catch(err){
        if(err.name == "BLOGS_NOT_FOUND"){
            res.status(404).json({message: "Blog not found"})
        }else if(err.name == "UNAUTHORIZED"){
            res.status(401).json({message: "You are unauthorized"})
        }else{
            res.status(500).json({message: "Something went down"})
        }
    }
}

module.exports = { authentication, authorization }