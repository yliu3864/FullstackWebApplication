const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const GooglePlusTokenStrategy = require('passport-google-plus-token')
var User = mongoose.model('User');


passport.use('googleToken', new GooglePlusTokenStrategy({
    clientID:'184255595389-jesos6ka9rsjvmlkeatvibtgg59r5bi6.apps.googleusercontent.com',
    clientSecret:'sGVsyyyQvw4EGKNnYKbYmuku'

}, async(accessToken, refreshToken,profile,done) => {
    try{
        console.log('accessToken',accessToken);
        console.log('refreshToken',refreshToken);
        console.log('profile',profile); 
    
    
        //check current user exitst
        const exitstingUser=await User.findOne({"google.id":profile.id});
        if(exitstingUser){
            return done(null,exitstingUser);
        }
    
        //if new accent
        const newUser=new User({
            method:'google',
            google:{
                id:profile.id,
                email: profile.emails[0].value
            }
        });
        await newUser.save();
        done(null,newUser);
    }catch(error){
        done(error,false,error.message);
    }

    // console.log('accessToken',accessToken);
    // console.log('refreshToken',refreshToken);
    // console.log('profile',profile); 


    // //check current user exitst
    // const exitstingUser=await User.findOne({"google.id":profile.id});
    // if(exitstingUser){
    //     return done(null,exitstingUser);
    // }

    // //if new accent
    // const newUser=new User({
    //     method:'google',
    //     google:{
    //         id:profile.id,
    //         email: profile.emails[0].value
    //     }
    // });
    // await newUser.save();
    // done(null,newUser);

}));

passport.use(
    new localStrategy({ usernameField: 'email' },
        (username, password, done) => {
            User.findOne({ email: username },
                (err, user) => {
                   if (err)
                        return done(err);
                    // unknown user
                    else if (!user)
                        return done(null, false, { message: 'Email is not registered' });
                    // wrong password
                    else if (!user.verifyPassword(password))
                        return done(null, false, { message: 'Wrong password.' });
                    // authentication succeeded
                    
                    
                    else if(user.type=='deactivated'){
                        return done(null, false, { message: 'account deactivated pls contact YanGe@qq.com' });
                    }
                    else if(user.active==false){
                        return done(null, false, { message: 'Pleser varify email' });
                    }

                    else
                        return done(null, user);
                });
        })
);