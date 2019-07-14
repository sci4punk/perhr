const express = require('express');
const router  = express.Router();
const bcrypt  = require('bcryptjs');
const User    = require('../models/User');

const passport = require('passport');

const ensureLogin = require('connect-ensure-login');

router.get('/signup', (req, res, next)=>{
    res.render('user-views/signup');
})

router.post('/signup', (req, res, next)=>{

    const thePassword = req.body.thePassword;
    const theUsername = req.body.theEmail;
    const email       = req.body.theEmail

    const salt = bcrypt.genSaltSync(12);
    const hashedPassWord =  bcrypt.hashSync(thePassword, salt);

    User.create({
        username: theUsername,
        password: hashedPassWord,
        email: email
    })
    .then((user)=>{
      req.login(user, (err, success)=> {
        let userId = user._id;
      res.redirect(`/profile/${userId}`);
    })})
    .catch((err)=>{
        next(err);
    })
})


router.get('/profile/:id', (req, res, next)=>{
  
  let userId = req.params.id;
  User.findById(userId)
  .then((oneSingleUser)=>{
    res.render('user-views/show', {user: oneSingleUser})
  })
  .catch((err)=>{
    next(err);
  })
});

router.get('/login', (req, res, next)=>{
    res.render('user-views/login')
})

router.post('/login',
  passport.authenticate('local'),
  function(req, res) {
  res.redirect('/profile/' + req.user.id);
  });

  // router.post('/logout', (req, res, next)=>{
  //   req.logout();
  //   res.redirect("/login");
  // })

  router.get('/auth/linkedin', passport.authenticate('linkedin', { state: true }));

  router.get('/auth/linkedin/callback', passport.authenticate('linkedin'), 
  function(req, res) {
    res.redirect('/profile/' + req.user.id);
  });

module.exports = router;

// ensureLogin.ensureLoggedIn('/login'),