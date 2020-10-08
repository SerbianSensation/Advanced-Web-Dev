var express = require('express');
var router = express.Router();
//require home and blog controllers files
var ctrlHome = require('../controllers/home');
var ctrlBlog = require('../controllers/blog');

/* GET home page. */
//reference index method of home controller in route function
router.get('/', ctrlHome.index);
//reference methods of blog controller
//GET pages to display blogList, blogAdd, blog to edit and blog to delete
router.get('/blogList', ctrlBlog.blogList);
router.get('/blogAdd', ctrlBlog.blogAdd);
router.get('/blogEdit/:blogid', ctrlBlog.blogEdit);
router.get('/blogDelete/:blogid', ctrlBlog.blogDelete);

//add post request to blogEdit/:blogid to edit blog (sent as PUT in controller)
router.post('/blogEdit/:blogid', ctrlBlog.editBlog);
//add post request to blogAdd for adding blogs
router.post('/blogAdd', ctrlBlog.addBlog);
//add post request for blogDelete/:blogid to delete blog (sent as DELETE in controller)
router.post('/blogDelete/:blogid', ctrlBlog.deleteBlog);

module.exports = router;
