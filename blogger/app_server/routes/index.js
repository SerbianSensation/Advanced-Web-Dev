var express = require('express');
var router = express.Router();
//require home and blog controllers files
var ctrlHome = require('../controllers/home');
var ctrlBlog = require('../controllers/blog');

/* GET home page. */
//reference index method of home controller in route function
router.get('/', ctrlHome.index);
//reference methods of blog controller
router.get('/blogList', ctrlBlog.blogList);
router.get('/blogAdd', ctrlBlog.blogAdd);
router.get('/blogEdit', ctrlBlog.blogEdit);
router.get('/blogDelete', ctrlBlog.blogDelete);

module.exports = router;
