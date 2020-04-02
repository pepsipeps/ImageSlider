var express = require("express");
var router  = express.Router();
var ground = require("../models/ground");
var middleware = require("../middleware");



router.get("/", function(req, res){
   
    ground.find({}, function(err, allgrounds){
       if(err){
           console.log(err);
       } else {
          res.render("grounds/index",{grounds:allgrounds});
       }
    });
});


router.post("/", middleware.isLoggedIn, function(req, res){
    
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    var newground = {name: name, image: image, description: desc, author:author}
    
    ground.create(newground, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
           
            console.log(newlyCreated);
            res.redirect("/grounds");
        }
    });
});


router.get("/new", middleware.isLoggedIn, function(req, res){
   res.render("grounds/new"); 
});


router.get("/:id", function(req, res){
    
   ground.findById(req.params.id).populate("comments").exec(function(err, foundground){
        if(err){
            console.log(err);
        } else {
            console.log(foundground)
            
            res.render("grounds/show", {ground: foundground});
        }
    });
});


router.get("/:id/edit", middleware.checkgroundOwnership, function(req, res){
    ground.findById(req.params.id, function(err, foundground){
        res.render("grounds/edit", {ground: foundground});
    });
});


router.put("/:id",middleware.checkgroundOwnership, function(req, res){
    
    ground.findByIdAndUpdate(req.params.id, req.body.ground, function(err, updatedground){
       if(err){
           res.redirect("/grounds");
       } else {
           
           res.redirect("/grounds/" + req.params.id);
       }
    });
});


router.delete("/:id",middleware.checkgroundOwnership, function(req, res){
   ground.findByIdAndRemove(req.params.id, function(err){
      if(err){
          res.redirect("/grounds");
      } else {
          res.redirect("/grounds");
      }
   });
});


module.exports = router;

