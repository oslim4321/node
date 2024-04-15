const express = require('express')
const { createBlog, getAllBlog } = require('../controller/blog')
const router  = express.Router()

router.get('/getAllBlogs', getAllBlog)
router.post('/createBlog', createBlog)

module.exports = router