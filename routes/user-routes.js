const express = require('express');
const router  = express.Router();
const bcrypt  = require('bcryptjs');
const User    = require('../models/User');
// const Skill = require('../models/Skill');
// const Portfolio = require('../models/Porfolio');

const passport = require('passport');

const ensureLogin = require('connect-ensure-login');

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

// SKILLS ROUTES
router.get('/profile/:id/skills/edit', (req, res, next)=>{
  let userId = req.params.id;
  User.findById(userId)
  .then((oneSingleUser)=>{
    res.render('user-views/skills/edit', {user: oneSingleUser})
  })
  .catch((err)=>{
    next(err);
  })
});

router.post('/profile/:id/skills/edit', (req, res, next)=>{
  let theID = req.params.id
  User.findByIdAndUpdate(theID, req.body)
  .then(()=>{
    res.redirect(`/profile/${theID}/skills`);
  })
  .catch((err)=>{
    next(err);
  })
});

router.get('/profile/:id/skills', (req, res, next)=>{
  
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
router.get('/profile/:id/portfolio/edit', (req, res, next)=>{
  let userId = req.params.id;
  User.findById(userId)
  .then((oneSingleUser)=>{
    res.render('user-views/portfolio/edit', {user: oneSingleUser})
  })
  .catch((err)=>{
    next(err);
  })
});

router.post('/profile/:id/portfolio/edit', (req, res, next)=>{
  let theID = req.params.id
  User.findByIdAndUpdate(theID, req.body)
  .then(()=>{
    res.redirect(`/profile/${theID}/portfolio`);
  })
  .catch((err)=>{
    next(err);
  })
});

router.get('/profile/:id/portfolio', (req, res, next)=>{
  
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
router.get('/profile/:id/edit', (req, res, next)=>{
  let userId = req.params.id;
  User.findById(userId)
  .then((oneSingleUser)=>{
    res.render('user-views/edit', {user: oneSingleUser})
  })
  .catch((err)=>{
    next(err);
  })
});

router.post('/profile/:id/edit', (req, res, next)=>{
  let theID = req.params.id
  User.findByIdAndUpdate(theID, req.body)
  .then(()=>{
    res.redirect(`/profile/${theID}`);
  })
  .catch((err)=>{
    next(err);
  })
});


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

// LOGIN ROUTES

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