var express = require("express");
var router  = express.Router({mergeParams: true});
var ground = require("../models/ground");
var Comment = require("../models/comment");
var middleware = require("../middleware");


router.get("/new",middleware.isLoggedIn, function(req, res){
    
    console.log(req.params.id);
    ground.findById(req.params.id, function(err, ground){
        if(err){
            console.log(err);
        } else {
             res.render("comments/new", {ground: ground});
        }
    })
});


router.post("/",middleware.isLoggedIn,function(req, res){
   
   ground.findById(req.params.id, function(err, ground){
       if(err){
           console.log(err);
           res.redirect("/grounds");
       } else {
        Comment.create(req.body.comment, function(err, comment){
           if(err){
               req.flash("error", "Something went wrong");
               console.log(err);
           } else {
               
               comment.author.id = req.user._id;
               comment.author.username = req.user.username;
               
               comment.save();
               ground.comments.push(comment);
               ground.save();
               console.log(comment);
               req.flash("success", "Successfully added comment");
               res.redirect('/grounds/' + ground._id);
           }
        });
       }
   });
});


router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req, res){
   Comment.findById(req.params.comment_id, function(err, foundComment){
      if(err){
          res.redirect("back");
      } else {
        res.render("comments/edit", {ground_id: req.params.id, comment: foundComment});
      }
   });
});


router.put("/:comment_id", middleware.checkCommentOwnership, function(req, res){
   Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
      if(err){
          res.redirect("back");
      } else {
          res.redirect("/grounds/" + req.params.id );
      }
   });
});


router.delete("/:comment_id", middleware.checkCommentOwnership, function(req, res){
    
    Comment.findByIdAndRemove(req.params.comment_id, function(err){
       if(err){
           res.redirect("back");
       } else {
           req.flash("success", "Comment deleted");
           res.redirect("/grounds/" + req.params.id);
       }
    });
});

module.exports = router;