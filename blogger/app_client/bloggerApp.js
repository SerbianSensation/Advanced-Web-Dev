var app = angular.module('bloggerApp', ['ngRoute']);

//*** routerProvider ***
app.config(function($routeProvider) {
	$routeProvider
		.when('/', {
			templateUrl: 'pages/home.html',
			controller: 'HomeController',
			controllerAs: 'vm'
		})

		.when('/blogList', {
			templateUrl: 'pages/blogList.html',
			controller: 'ListController',
			controllerAs: 'vm'
		})

		.when('/blogAdd', {
			templateUrl: 'pages/blogAdd.html',
			controller: 'AddController',
			controllerAs: 'vm'
		})

		.when('/blogEdit/:blogid', {
			templateUrl: 'pages/blogEdit.html',
			controller: 'EditController',
			controllerAs: 'vm'
		})

		.when('/blogDelete/:blogid', {
			templateUrl: 'pages/blogDelete.html',
			controller: 'DeleteController',
			controllerAs: 'vm'
		})

		.otherwise({redirectTo: '/blogList'});
});


//**** REST Web API functions ***

function getBlogs($http) {
	return $http.get('/api/blogs');
}

function getBlogById($http, id) {
	return $http.get('/api/blogs' + id);
}

function updateBlog($http, id, data) {
	return $http.put('/api/blogs/' + id);
}

//*** Controllers ***

//home (index) page controller
app.controller('HomeController', function HomeController() {
	var vm = this;
	vm.pageHeader = {
		title: "Stefan Gligorevic's Blog Site"
	};
	vm.message = "Welcome to my blog site!";
});

//blog list controller
app.controller('ListController', function ListController($http) {
	var.vm = this;
	vm.pageHeader = {
		title: 'Blog List'
	};

	getBlogs($http).success(function(data) {
		vm.blogs = data;
		vm.message = "Blog data found!";
	})
	.error(function (e) {
		vm.message = "Could not get list of blogs";
	});
});

//edit blog controller
app.controller('Edit Controller', [ '$http', '$routeParams', '$state', function EditController($http, $routeParams, $state) {
	var vm = this;
	vm.blog = {}; //start with empty blog
	vm.blogid = $routeParams.blogid; 
	vm.pageHeader = {
		title: 'Blog Edit'
	};

	//Get blog data to be displayed on edit page
	getBlogById($http, vm.blogid).success(function(data) {
		vm.blog = data;
		vm.message = "Blog data found!";
	})
	.error(function (e) {
		vm.message = "Could not get blog with id " + vm.blogid;
	});

	//Submit function attached to ViewModel for use in form
	vm.submit = function() {
		var data = vm.blog;
		data.title = userForm.title.value;
		data.text = userForm.text.value;

		updateBlog($http, vm.blogid, data).success(function(data) {
			vm.message = "Blog data updated!";
			$state.go('blogList'); //refer to book for info on StateProvider
		})
		.error(function (e) {
			vm.message = "Could not update blog with id " + vm.blogid + userForm.title.text + " " + userForm.text.text;
		});
	}
}]);
