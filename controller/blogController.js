const {Blog} = require('../models/index')

class BlogControl {
    static async fetchAllBlog (req, res, next){
        try {
            const cursor = await Blog.findAll({})
            
            return res.status(200).json({blogs: cursor})
        } catch (error) {
            if(err.name == "BAD_REQUEST"){
                return res.status(400).json({msg: "Bad request"})
            }
            return res.status(400).json({message: error})
        }
    }

    static async fetchDetailBlog (req, res, next){
        try {
            const cursor = await Blog.findOne({
                where: {id: +req.params.id}
            })

            if(!cursor){
                return res.status(404).json({message: 'Blog not found'})
            }

            return res.status(200).json(cursor)
        } catch (error) {
            if(err.name == "BAD_REQUEST"){
                return res.status(400).json({msg: "Bad request"})
            }
            return res.status(400).json({message: error})
        }
    }

    static async createBlog (req, res, next){
        try {
            const {title, body} = req.body
            if(!title || !body) throw {name: "BAD_REQUEST"}

            const newBlog = await Blog.create({
                title: title,
                body: body,
                UserId: +req.user.id
            })

            return res.status(201).json(newBlog)
        } catch (error) {
            if(err.name == "BAD_REQUEST"){
                return res.status(400).json({msg: "Bad request"})
            }
            return res.status(400).json({message: error})
        }
    }

    static async updateBlog (req, res, next){
        try {
            const {title, body} = req.body
            if(!title || !body) throw {name: "BAD_REQUEST"}

            const cursor = await Blog.findOne({where: {id: +req.params.id}})
            console.log(cursor);
            if(!cursor){
                return res.status(404).json({message: 'Blog not found'})
            }
            const newBlog = await Blog.update({
                title: title,
                body: body,
            }, {where: {id: +req.params.id}})
            return res.status(200).json({message: 'success update blog'})
        } catch (error) {
            if(error.name == "BAD_REQUEST"){
                return res.status(400).json({msg: "Bad request"})
            }
            return res.status(400).json({message: error})
        }
    }

    static async deleteBlog (req, res, next){
        try {
            const cursor = await Blog.findOne({where: {id: +req.params.id}})

            if(!cursor){
                return res.status(404).json({message: 'Blog not found'})
            }
            await Blog.destroy({where: {id: +req.params.id}})
            console.log();
            return res.status(200).json({message: `${cursor.title} blog has been deleted`})
        } catch (error) {
            if(error.name == "BAD_REQUEST"){
                return res.status(400).json({msg: "Bad request"})
            }
            return res.status(400).json({message: error})
        }
    }
}

module.exports = BlogControl