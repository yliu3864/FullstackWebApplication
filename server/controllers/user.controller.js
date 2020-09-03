const mongoose = require('mongoose');
const passport = require('passport');
const _ = require('lodash');

const User = mongoose.model('User');

var nodemailer = require('nodemailer');
var sgTransport = require('nodemailer-sendgrid-transport');

  

module.exports.register = (req, res, next) => {
    var user = new User();
    user.fullName = req.body.fullName;
    user.email = req.body.email;
    user.password = req.body.password;
    user.method="local";
    user.active=false;
    user.type="user";
    
    var options = {
        auth: {
          api_user: 'yange',
          api_key: 'ly1234567890'
        }
      }
    var client = nodemailer.createTransport(sgTransport(options));


    user.save((err, doc) => {
        if (!err){

        var emailemail = {
            from: 'Localhost Staff, staff@localhost.com',
            to: user.email,
            subject: 'Acitivation Link',
            text: 'Hello world',
            html: 'Hello<strong>'+user.email+'</strong>,<br><br>Thanks<br><br><a href="http://localhost:3000/api/email/'+req.body.email+'">click here</a>'
            // html: 'Hello<strong>'+user.name+'</strong>,<br><br>Thanks<br><br><a href="http://3.228.125.103:8080/check.html?param1='+req.body.email+'">click here</a>'
          };
          
          client.sendMail(emailemail, function(err, info){
              if (err ){
                console.log(err);
              }
              else {
                console.log('Message sent: ' + info.response);
              }
          });

            res.send(doc);
         } else {
            if (err.code == 11000)
                res.status(422).send(['Duplicate email adrress found.']);
            else
                return next(err);
        }




    });
}
module.exports.googlelogin=(req,res)=>{
    var user = new User();
    user.fullName = req.body.fullName;
    user.email = req.body.email;
    user.password = req.body.password;
    user.method="google";
    user.active=true;

    user.save((err,doc)=>{
        if (!err){
        res.send(doc);
        }else{
            console.log(err);
        }
    })
}



module.exports.varify=(req,res)=>{
    // console.log(req.params.varify)
    // console.log(User.findOne({email:req.params.varify}))
     console.log('11111',req.params.varify)
    User.findOneAndUpdate({email:req.params.varify},{$set:{active:true}}).then((updatedDoc) => {
       
        res.send(
            '<html><a href="http://localhost:4200/login">successed and back to loginin</a></html>'
        );
    })
};


module.exports.authenticate = (req, res, next) => {
    // call for passport authentication
    passport.authenticate('local', (err, user, info) => {       
        // error from passport middleware
        if (err) return res.status(400).json(err);
        // registered user
        else if (user) return res.status(200).json({ "token": user.generateJwt() });
        // unknown user or wrong password
        else return res.status(404).json(info);
    })(req, res);
}

module.exports.authenticateGoogle = (req, res, next) => {
    // call for passport authentication
    passport.authenticate('googleToken', (err, user, info) => {       
        // error from passport middleware
        if (err) return res.status(400).json(err);
        // registered user
        else if (user) return res.status(200).json({ "token": user.generateJwt() });
        // unknown user or wrong password
        else return res.status(404).json(info);
    })(req, res);
}

module.exports.userProfile = async(req, res, next) =>{
    
    await User.findOne({ _id: req._id },
        (err, user) => {
            if (!user)
                return res.status(404).json({ status: false, message: 'User record not found.' });
            else
                return res.status(200).json({ status: true, user : _.pick(user,['fullName','email','type']) });
        }
    );
}

module.exports.resendemail=async(req, res, next) =>{
    var options = {
        auth: {
          api_user: 'yange',
          api_key: 'ly1234567890'
        }
      }
    var client = nodemailer.createTransport(sgTransport(options));
var emailemail = {
    from: 'Localhost Staff, staff@localhost.com',
    to: req.params.id,
    subject: 'Acitivation Link',
    text: 'Hello world',
    html: '<br><br>Thanks<br><br><a href="http://localhost:3000/api/email/'+req.params.id+'">click here</a>'
    // html: 'Hello<strong>'+user.name+'</strong>,<br><br>Thanks<br><br><a href="http://3.228.125.103:8080/check.html?param1='+req.body.email+'">click here</a>'
  };
  
  client.sendMail(emailemail, function(err, info){
      if (err ){
        console.log(err);
        
      }
      else {
        console.log('Message sent: ' + info.response);
        return res.status(200).send("");
      }
  });
}