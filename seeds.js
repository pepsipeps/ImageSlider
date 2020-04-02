var mongoose = require("mongoose");
var ground = require("./models/ground");
var Comment   = require("./models/comment");

var data = [
    {
        name: "Flower Garden", 
        image: "https://1.bp.blogspot.com/-cmgkTa0teIg/UV3T5YgvvWI/AAAAAAAAp4k/Fk3YyGtJ_30/s1600/Desktop++Beautiful+Flowers+HD+Wallpapers.+(1).jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
    },
    {
        name: "Perfection", 
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Rain-Drops-on-Lotus-Flowers-Wallpapers-HD-Pictures.jpg/960px-Rain-Drops-on-Lotus-Flowers-Wallpapers-HD-Pictures.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
    },
    {
        name: "Divine", 
        image: "https://pillarnonprofit.ca/sites/default/files/dandelion-flower-hd-wallpapers.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
    }
]

function seedDB(){
 
   ground.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("removed grounds!");
         
        data.forEach(function(seed){
            ground.create(seed, function(err, ground){
                if(err){
                    console.log(err)
                } else {
                    console.log("added a ground");
                    
                    Comment.create(
                        {
                            text: "Beautiful",
                            author: "Homer"
                        }, function(err, comment){
                            if(err){
                                console.log(err);
                            } else {
                                ground.comments.push(comment);
                                pground.save();
                                console.log("Created new comment");
                            }
                        });
                }
            });
        });
    }); 
    
}

module.exports = seedDB;
