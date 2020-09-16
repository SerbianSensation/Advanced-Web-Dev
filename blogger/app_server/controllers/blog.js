/* GET Blog Add page */
module.exports.blogAdd = function(req, res) {
  res.render('blogAdd', { title: 'Blog Add' });
};

/* GET Blog List page */
module.exports.blogList = function(req, res) {
  res.render('blogList', { title: 'Blog List' });
};
