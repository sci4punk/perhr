const express = require('express');
const router  = express.Router();
const bcrypt  = require('bcryptjs');
const User    = require('../models/User');
// const Skill = require('../models/Skill');

const passport = require('passport');

const ensureLogin = require('connect-ensure-login');

// SIGNUP ROUTES

router.get('/signup', (req, res, next)=>{
    res.render('user-views/signup');
})

router.post('/signup', (req, res, next)=>{

    const thePassword = req.body.thePassword;
    const theUsername = req.body.theUsername;
    const email       = req.body.theEmail;
    const fullName    = req.body.theFullName;
    

    const salt = bcrypt.genSaltSync(12);
    const hashedPassWord =  bcrypt.hashSync(thePassword, salt);

console.log(`This is the username: ${theUsername}`);

    User.create({
        username: theUsername,
        password: hashedPassWord,
        email: email,
        fullName: fullName
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

// RATE ROUTES
router.get('/profile/:id/rate/edit', ensureLogin.ensureLoggedIn('/login'), (req, res, next)=>{
  let userId = req.params.id;
  User.findById(userId)
  .then((oneSingleUser)=>{
    res.render('user-views/rate/edit', {user: oneSingleUser})
  })
  .catch((err)=>{
    next(err);
  })
});

router.post('/profile/:id/rate/edit', ensureLogin.ensureLoggedIn('/login'), (req, res, next)=>{
  let theID = req.params.id
  User.findByIdAndUpdate(theID, req.body)
  .then(()=>{
    res.redirect(`/profile/${theID}/rate`);
  })
  .catch((err)=>{
    next(err);
  })
});

router.get('/profile/:id/rate', ensureLogin.ensureLoggedIn('/login'), (req, res, next)=>{
  
  let userId = req.params.id;
  User.findById(userId)
  .then((oneSingleUser)=>{
    res.render('user-views/rate/show', {user: oneSingleUser})
  })
  .catch((err)=>{
    next(err);
  })
});

// SKILLS ROUTES
router.get('/profile/:id/skills/edit', ensureLogin.ensureLoggedIn('/login'), (req, res, next)=>{
  let userId = req.params.id;
  User.findById(userId)
  .then((oneSingleUser)=>{
    res.render('user-views/skills/edit', {user: oneSingleUser})
  })
  .catch((err)=>{
    next(err);
  })
});

// THE BELOW HAS OT BE CHANGED TO USE THE SKILLS MODEL, PUSH IDS ONTO USER, ADD NEW SKILLS ONTO BOTH
router.post('/profile/:id/skills/edit', ensureLogin.ensureLoggedIn('/login'), (req, res, next)=>{
  let theID = req.params.id
  User.findByIdAndUpdate(theID, {$push: {"skills": {name: req.body.name, icon: req.body.icon}}}, {upsert: true, new: true})
  .then(()=>{
    res.redirect(`/profile/${theID}/skills`);
  })
  .catch((err)=>{
    next(err);
  })
});

router.get('/profile/:id/skills', ensureLogin.ensureLoggedIn('/login'), (req, res, next)=>{
  
  let userId = req.params.id;
  User.findById(userId)
  .then((oneSingleUser)=>{
    res.render('user-views/skills/show', {user: oneSingleUser})
  })
  .catch((err)=>{
    next(err);
  })
});

// PORTFOLIO ROUTES
router.get('/profile/:id/portfolio/edit', ensureLogin.ensureLoggedIn('/login'), (req, res, next)=>{
  let userId = req.params.id;
  User.findById(userId)
  .then((oneSingleUser)=>{
    res.render('user-views/portfolio/edit', {user: oneSingleUser})
  })
  .catch((err)=>{
    next(err);
  })
});

router.post('/profile/:id/portfolio/edit', ensureLogin.ensureLoggedIn('/login'), (req, res, next)=>{
  let theID = req.params.id
  User.findByIdAndUpdate(theID, req.body)
  .then(()=>{
    res.redirect(`/profile/${theID}/portfolio`);
  })
  .catch((err)=>{
    next(err);
  })
});

router.get('/profile/:id/portfolio', ensureLogin.ensureLoggedIn('/login'), (req, res, next)=>{
  
  let userId = req.params.id;
  User.findById(userId)
  .then((oneSingleUser)=>{
    res.render('user-views/portfolio/show', {user: oneSingleUser})
  })
  .catch((err)=>{
    next(err);
  })
});

// PROFILE ROUTES
router.get('/profile/:id/edit', ensureLogin.ensureLoggedIn('/login'), (req, res, next)=>{
  let userId = req.params.id;
  User.findById(userId)
  .then((oneSingleUser)=>{
    res.render('user-views/edit', {user: oneSingleUser})
  })
  .catch((err)=>{
    next(err);
  })
});

router.post('/profile/:id/edit', ensureLogin.ensureLoggedIn('/login'), (req, res, next)=>{
  let theID = req.params.id
  User.findByIdAndUpdate(theID, req.body)
  .then(()=>{
    res.redirect(`/profile/${theID}`);
  })
  .catch((err)=>{
    next(err);
  })
});

                          // REMOVE BELOW TO EXPOSE IT PUBLICLY
router.get('/profile/:id', ensureLogin.ensureLoggedIn('/login'), (req, res, next)=>{
  
  let userId = req.params.id;
  User.findById(userId)
  .then((oneSingleUser)=>{
    res.render('user-views/show', {user: oneSingleUser})
  })
  .catch((err)=>{
    next(err);
  })
});

// LOGIN LOGOUT ROUTES
router.get('/login', (req, res, next)=>{
    res.render('user-views/login')
})

router.post('/login',
  passport.authenticate('local'),
  function(req, res) {
  res.redirect('/profile/' + req.user.id);
  });

router.get('/logout', (req, res, next)=>{
  req.logout();
  res.redirect("/login");
})

// LINKEDIN AUTH ROUTES
router.get('/auth/linkedin', passport.authenticate('linkedin', { state: true }));

router.get('/auth/linkedin/callback', passport.authenticate('linkedin'), 
function(req, res) {
  res.redirect('/profile/' + req.user.id);
});

module.exports = router;

// ensureLogin.ensureLoggedIn('/login'),