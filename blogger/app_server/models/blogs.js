var mongoose = require( 'mongoose' );

var blogSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true
	},
	text: {
		type: String,
		required: true
	},
	createdOn: {
		type: Date,
		"default": Date.now,
		required: true
	}
});

mongoose.model('Blog', blogSchema);

