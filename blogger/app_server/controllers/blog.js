/* Create request object to communicate with api */
var request = require('request');
var apiOptions = {
	server : "http://3.237.172.53:80"
};

/* function for displaying errors */
var _showError = function (req, res, status) {
	var title, content;
	if (status === 404) {
		title = "404, page not found";
		content = "We can't find this page. Sorry.";
	} else if (status === 500) {
		title = "500, internal server error";
		content = "Yikes, there's a problem with our server...";
	} else {
		title = status + ", something's gone wrong";
		content = "Something seems to be wrong...";
	}
	res.status(status);
	//render textPage view to display the title and content text
	res.render('textPage', {
		title : title,
		content : content
	});
};

/* GET Blog Add page */
module.exports.blogAdd = function(req, res) {
  res.render('blogAdd', { title: 'Add Blog' });
};

/* Add a blog (POST) */
module.exports.addBlog = function(req, res) {
	var path = '/api/blogs';

	var postdata = {
		title: req.body.title,
		text: req.body.text,
		createdOn: new Date().toLocaleString("en-US", {timeZone: "America/New_York"})
	};

	var requestOptions = {
		url : apiOptions.server + path,
		method : "POST",
		json : postdata
	};

	request(requestOptions, function(err, response, body) {
		if(response.statusCode === 201){
			res.redirect('/blogList');
		} else {
			_showError(req, res, response.statusCode);
		}
	}
	);
};

/* GET list of blogs */
module.exports.blogList = function(req, res) {
	var path = '/api/blogs/';
	var requestOptions = {
		url : apiOptions.server + path,
		method : "GET",
		json : {},
		qs : {}
	};
	
	request(requestOptions, function(err, response, body) {
		renderBlogListPage(req, res, body);
	}
	);
};

/* Render Blog List page */
var renderBlogListPage = function(req, res, responseBody) {
  res.render('blogList', { 
	  title: 'Blog List',
	  blogs: responseBody
  });
};

/* GET one blog (for editing blogs) */
module.exports.blogEdit = function(req, res) {
	var path = '/api/blogs/' + req.params.blogid;
	var requestOptions = {
		url : apiOptions.server + path,
		method : "GET",
		json : {}
	};
	request(requestOptions, function(err, response, body) {
		renderBlogEditPage(req, res, body);
	}
	);
};

/* Render Blog Edit page */
var renderBlogEditPage = function(req, res, responseBody) {
  res.render('blogEdit', { title: 'Edit Blog', blog: responseBody });
};

/* Update blog post (PUT) */
module.exports.editBlog = function(req, res) {
	var id = req.params.blogid;
	var path = '/api/blogs/' + id;

	var postdata = {
		title: req.body.title,
		text: req.body.text
	};

	var requestOptions = {
		url : apiOptions.server + path,
		method : "PUT",
		json : postdata
	};

	request(requestOptions, function(err, response, body) {
		if(response.statusCode === 201) {
			res.redirect('/blogList');
		} else {
			_showError(req, res, response.statusCode);
		}
	}
	);
};

/* Render blog delete page */
var renderBlogDeletePage = function(req, res, responseBody) {
	res.render('blogDelete', { title: 'Delete Blog', blog: responseBody });
};


/* GET Blog Delete page */
module.exports.blogDelete = function(req, res) {
	var path = "/api/blogs/" + req.params.blogid;
	
	var requestOptions = {
		url : apiOptions.server + path,
		method : "GET",
		json : {}
	};

	request(requestOptions, function(err, response, body) {
		renderBlogDeletePage(req, res, body);
	}
	);
};

/* DELETE blog */
module.exports.deleteBlog = function(req, res) {
	var path = "/api/blogs/" + req.params.blogid;

	requestOptions = {
		url : apiOptions.server + path,
		method : "DELETE",
		json : {}
	};

	request(requestOptions, function(err, response, body) {
		if(response.statusCode === 204){
			res.redirect('/blogList');
		} else {
			_showError(req, res, response.statusCode);
		}
	}
	);
};
