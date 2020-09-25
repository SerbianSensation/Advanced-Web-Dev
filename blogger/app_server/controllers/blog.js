/* GET Blog Add page */
module.exports.blogAdd = function(req, res) {
  res.render('blogAdd', { title: 'Add Blog' });
};

/* GET Blog List page */
module.exports.blogList = function(req, res) {
  res.render('blogList', { 
	  title: 'Blog List',
	  blogs: [{
		  title: 'Intro Blog',
		  text: 'My first blog.',
		  createdOn: new Date(2020, 8, 23)
	  }, {
		  title: 'CS406',
		  text: 'CS406 is a pretty cool class.',
		  createdOn: new Date(2020, 8, 23)
	  }, {
		  title: '3rd is the lucky charm',
		  text: '3rd blog is the lucky charm, right?',
		  createdOn: new Date(2020, 8, 23)
	  }]
  });
};

/* GET Blog Edit page */
module.exports.blogEdit = function(req, res) {
  res.render('blogEdit', { title: 'Edit Blog' });
};

/* GET Blog Delete page */
module.exports.blogDelete = function(req, res) {
  res.render('blogDelete', { title: 'Delete Blog' });
};
