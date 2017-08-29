var express = require("express");
var app = express(); 
var methodOverride = require("method-override");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/dogBlogs");
var dogBlog = require("./models/dogs.js");
var seedDB = require("./seed.js");
var CommentS = require("./models/comment.js");
app.use(bodyParser.urlencoded({extended:true}));
app.use(methodOverride("_method"));

seedDB();
app.get("/dogMain",function(req,res){
	dogBlog.find({},function(err,dogs){
			if(err){
				console.log(err);
			}else{
				res.render("Dogs/dogMain.ejs",{dogBlog:dogs});
			}
	});
});
app.post("/dogMain",function(req,res){
	dogBlog.create(req.body.dogBlog,function(err,dogsFound){
			if(err){
				console.log("Error");
			}else{
				res.redirect("/dogMain");
			}
	});
	
});
app.get("/dogMain/new",function(req,res){
	res.render("Dogs/dogForm.ejs");
});





app.get("/dogMain/:id",function(req,res){
	dogBlog.findById(req.params.id).populate("comments").exec(function(err,FoundDogs){
			if(err){
				console.log(err);
			}else{
				console.log(FoundDogs);
				res.render("Dogs/dogShow.ejs",{dogBlog:FoundDogs});
			}
	});
	
});
app.get("/dogMain/:id/edit",function(req,res){
	dogBlog.findById(req.params.id,function(err,FoundDogs){
			if(err){
				console.log(err);
			}else{
				res.render("Dogs/dogEdit.ejs",{dogBlog:FoundDogs});
			}
	});
}); 
app.put("/dogMain/:id",function(req,res){
	dogBlog.findByIdAndUpdate(req.params.id,req.body.dogBlog,function(err,updatedDoge){
				if(err){
					res.redirect("/dogMain");
				}else{
					res.redirect("/dogMain/" + req.params.id);
				}
	});
});
app.get("/dogMain/:id/comments/new",function(req,res){
		dogBlog.findById(req.params.id,function(err,dogBlog){
			if(err){
				console.log(err);
			}else{
				res.render("comments/new.ejs",{dogBlog:dogBlog});
			}
		});
});
app.post("/dogMain/:id/comments",function(req,res){
		dogBlog.findById(req.params.id,function(err,dogBlog){
			if(err){
				console.log(err);
				res.redirect("/dogMain");
			}else{
				CommentS.create(req.body.CommentS,function(req,created){
					if(err){
						console.log(err);
					}else{
						dogBlog.comments.push(created);
						dogBlog.save();
						res.redirect("/dogMain/"+dogBlog._id);
					}
				});
			}
});
	});








app.delete("/dogMain/:id",function(req,res){
	dogBlog.findByIdAndRemove(req.params.id,function(err){
		if(err){
			res.redirect("/dogMain");
		}else{
			res.redirect("/dogMain");
		}
	});
});



app.listen(5060,function(){
		console.log("Connected");
});