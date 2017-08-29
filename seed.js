var mongoose = require("mongoose");
var dogs = require("./models/dogs.js");
var CommentS = require("./models/comment.js");
var data = [
				{
					names: "Pupper",
					image: "http://cdn3-www.dogtime.com/assets/uploads/gallery/30-impossibly-cute-puppies/impossibly-cute-puppy-21.jpg",
					textareas: "I'm a small doggo. I like to jump around and have fun fun fun."
				},
				{
					names: "Doge",
					image:"https://vignette1.wikia.nocookie.net/sanicsource/images/9/97/Doge.jpg/revision/latest?cb=20160112233015",
					textareas: "I'm the sensational meme doge.I'm from Japan. I'm such famous, I get much love from hoomans"
				},
				{
					names: "Doggo",
					image: "https://www.rover.com/blog/wp-content/uploads/2016/02/6131305908_d882b5628e_o.jpg",
					textareas: "I'm a sweet doggo. Hoomans love me so much,they pet me. I love my hooman, I gave him a stick for his birthday as a gift."
				}
			];
function seedDB(){ 
	dogs.remove({},function(err){
		if(err){
			console.log(err);
		}
			console.log("removed");
			data.forEach(function(doggy){
				dogs.create(doggy,function(err,data){
					if(err){
						console.log(err);
					}else{
						CommentS.create({
							text: "Vidhur",
							author: "Hey this is awesome, I love dogs.Hey doggy!"
						},function(err,commentCreated){
							if(err){
								console.log(err);
							}else{
								data.comments.push(commentCreated);
								data.save(function(err,saved){
									if(err){
										console.log(err);
									}else{
										console.log("Saved");
									}

								});
							}
						});

					}
				});
			});
		
	});

	}
module.exports = seedDB;