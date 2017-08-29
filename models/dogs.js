var mongoose = require("mongoose");
var schema = new mongoose.Schema({
	names: String,
	image: String,
	textareas: String,
	comments:[
				 {
					type: mongoose.Schema.Types.ObjectId,
		 			ref: "Comment"
				}
		]
});
var dogBlog = mongoose.model("dog",schema);
module.exports=dogBlog; 