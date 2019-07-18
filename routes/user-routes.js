const express = require('express');
const router  = express.Router();
const bcrypt  = require('bcryptjs');
const User    = require('../models/User');
const Skill = require('../models/Skill');
const Portfolio = require('../models/Portfolio');

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
  User.findById(userId).populate('skills').populate('portfolio')
  .then((oneSingleUser)=>{
    if(oneSingleUser._id.toString()===req.user._id.toString()){
      oneSingleUser.owner = true;
    }
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
  User.findById(userId).populate('skills').populate('portfolio')
  .then((oneSingleUser)=>{
    if(oneSingleUser._id.toString()===req.user._id.toString()){
      oneSingleUser.owner = true;
    }
    res.render('user-views/rate/show', {user: oneSingleUser})
  })
  .catch((err)=>{
    next(err);
  })
});

// SKILLS ROUTES

router.get('/profile/:id/skills/edit', ensureLogin.ensureLoggedIn('/login'), (req, res, next)=>{
  let userId = req.params.id;
  User.findById(userId).populate('skills').populate('portfolio')
  .then((oneSingleUser)=>{
   
    Skill.find()
    .then((allTheSkills)=>{
      res.render('user-views/skills/all-skills', {user: oneSingleUser, allTheSkills: allTheSkills})
    })
    .catch((err)=>{
      next(err);
    })

  .catch((err)=>{
    next(err);
  })

})
});

router.post('/profile/:id/skills/edit', ensureLogin.ensureLoggedIn('/login'), (req, res, next)=>{
  let theID = req.params.id

  User.findByIdAndUpdate(theID, {$push: {skills: req.body.skills}}, {upsert: true, new: true})
  .then(()=>{

    res.redirect(`/profile/${theID}/skills/edit`);
  })
  .catch((err)=>{
    next(err);
  })
});

// DELETE SKILLS ROUTE

router.post('/profile/:id/skills/delete', (req, res, next)=>{
  let userId = req.params.id;

  User.findById(userId)
  .then(()=>{
    
    User.findByIdAndUpdate(userId, {$pull: {skills: req.body.skills}}, {upsert: true, new: true})
    .then(()=>{
      res.redirect(`/profile/${userId}/skills/edit`);
    })

    .catch((err)=>{
      next(err);
    })

  .catch((err)=>{
    next(err);
  })
})
});

router.get('/profile/:id/skills', ensureLogin.ensureLoggedIn('/login'), (req, res, next)=>{
  
  let userId = req.params.id;
  User.findById(userId).populate('skills').populate('portfolio')
  .then((oneSingleUser)=>{
    if(oneSingleUser._id.toString()===req.user._id.toString()){
      oneSingleUser.owner = true;
    }
    res.render('user-views/skills/show', {user: oneSingleUser})
  })
  .catch((err)=>{
    next(err);
  })
});

// PORTFOLIO ROUTES

router.get('/profile/:id/portfolio/edit', ensureLogin.ensureLoggedIn('/login'), (req, res, next)=>{
  let userId = req.params.id;
  User.findById(userId).populate('skills').populate('portfolio')
  .then((oneSingleUser)=>{
    if(oneSingleUser._id.toString()===req.user._id.toString()){  // checking edit routes!!!
      oneSingleUser.owner = true;
    } 
    Portfolio.find()
    .then((allThePortfolios)=>{
      res.render('user-views/portfolio/addremove', {user: oneSingleUser, allThePortfolios: allThePortfolios})
    })
    .catch((err)=>{
      next(err);
    })

  .catch((err)=>{
    next(err);
  })

})
});

router.post('/profile/:id/portfolio/edit', ensureLogin.ensureLoggedIn('/login'), (req, res, next)=>{
  let theID = req.params.id

  User.findByIdAndUpdate(theID, {$push: {portfolio: req.body.portfolio}}, {upsert: true, new: true})
  .then(()=>{

    res.redirect(`/profile/${theID}/portfolio/edit`);
  })
  .catch((err)=>{
    next(err);
  })
});

// DELETE PORTFOLIO ROUTE

router.post('/profile/:id/portfolio/delete', (req, res, next)=>{
  let userId = req.params.id;

  User.findById(userId)
  .then(()=>{
    
    User.findByIdAndUpdate(userId, {$pull: {portfolio: req.body.portfolio}}, {upsert: true, new: true})
    .then(()=>{
      res.redirect(`/profile/${userId}/portfolio/edit`);
    })

    .catch((err)=>{
      next(err);
    })

  .catch((err)=>{
    next(err);
  })
})
});

router.get('/profile/:id/portfolio', ensureLogin.ensureLoggedIn('/login'), (req, res, next)=>{
  
  let userId = req.params.id;
  User.findById(userId).populate('skills').populate('portfolio')
  .then((oneSingleUser)=>{
    if(oneSingleUser._id.toString()===req.user._id.toString()){
      oneSingleUser.owner = true;
    }
    res.render('user-views/portfolio/show', {user: oneSingleUser})
  })
  .catch((err)=>{
    next(err);
  })
});

// PROFILE ROUTES
router.get('/profile/:id/edit', ensureLogin.ensureLoggedIn('/login'), (req, res, next)=>{
  let userId = req.params.id;
  User.findById(userId).populate('skills').populate('portfolio')
  .then((oneSingleUser)=>{
    if(oneSingleUser._id.toString()===req.user._id.toString()){
      oneSingleUser.owner = true;
    }
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
  User.findById(userId).populate('skills').populate('portfolio')
  .then((oneSingleUser)=>{ 
    if(oneSingleUser._id.toString()===req.user._id.toString()){
      oneSingleUser.owner = true;
    }
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
