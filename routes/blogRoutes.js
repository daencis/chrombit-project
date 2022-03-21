const router = require('express').Router()
const blogController = require('../controller/blogController')
const { authorization } = require('../middleware/authentication')

router.get('/', blogController.fetchAllBlog)
router.post('/create', blogController.createBlog)
router.patch('/update/:id', authorization, blogController.updateBlog)
router.delete('/delete/:id', authorization, blogController.deleteBlog)
router.get('/:id', blogController.fetchDetailBlog)

module.exports = router