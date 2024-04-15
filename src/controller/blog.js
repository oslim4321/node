const Blog = require("../model/blog")

const createBlog = async(req, res)=>{
    const {title, description, author} = req.body
    try {
      const blogRes = await Blog.create({title, description, author})
      res.status(201).json({
        message: "Blog created successfully!",
        blog: blogRes,
      })
    
    } catch (error) {
        res.status(500).json({message: 'errorr', error})
    }
}

const getAllBlog = async(req, res)=>{
    try {
      const blogRes = await Blog.find()
      res.status(200).json({
        result: blogRes.length,
        blogs: blogRes,
      })
    
    } catch (error) {
        res.status(500).json({message: 'errorr', error})
    }
}

module.exports = {createBlog, getAllBlog}