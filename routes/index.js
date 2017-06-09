var express = require('express');
var router = express.Router();
var requestDemo = require('./../public/javascripts/schema.js');
var mongoose = require('mongoose');
var url = 'mongodb://khaja:khaja@ds115701.mlab.com:15701/schooldb';

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Chale School' });
});


router.post('/demoRequest', function(req, res, next) {
      // create a new user
      var response = [];
      var db = mongoose.connect(url);
      var checkForMobAndEmail = function(item) {
          if(item.toObject().emailid === req.body.emailid){
                response.push("Email Id");  
            }
            if(item.toObject().mobContact == req.body.mobContact){
                response.push("Mobile Number");
            }
      };    
      requestDemo.find({$or: [{"mobContact" : req.body.mobContact},{"emailid":req.body.emailid}]},function(err,details){
            JSON.stringify(details);
            if(details.length != 0){
                details.forEach(checkForMobAndEmail);                
                res.send(response);
                db.disconnect();
            }
            else{
                var newUser = requestDemo({
                name: req.body.name,
                schoolName: req.body.schoolName,
                mobContact: req.body.mobContact,
                emailid: req.body.emailid,
                address: req.body.address,
                });

                // save the user
                newUser.save(function (err) {
                    if (err) throw err;
                    res.send(response);
                    db.disconnect();
                });
            }
      })    
});

module.exports = router;
