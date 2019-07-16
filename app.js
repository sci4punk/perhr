require('dotenv').config();

const bodyParser   = require('body-parser');
const cookieParser = require('cookie-parser');
const express      = require('express');
const favicon      = require('serve-favicon');
const hbs          = require('hbs');
const mongoose     = require('mongoose');
const logger       = require('morgan');
const path         = require('path');

const User         = require('./models/User');

const session = require("express-session");
const bcrypt = require("bcryptjs");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const flash = require("connect-flash");

// const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;

const LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;

mongoose
  .connect('mongodb://localhost/perhr', {useNewUrlParser: true})
  .then(x => {
    // console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });

const app_name = require('./package.json').name;
const debug = require('debug')(`${app_name}:${path.basename(__filename).split('.')[0]}`);

const app = express();

// Middleware Setup
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Express View engine setup

app.use(require('node-sass-middleware')({
  src:  path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  sourceMap: true
}));
      
hbs.registerPartials(__dirname + '/views/user-views/partials');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));


// logo file
// app.use(express.static(path.join(__dirname, 'public', 'images', 'logo.png')));


// default value for title local
app.locals.title = 'per.hr - set your hourly rate for project, contract jobs, freelance work';

app.use(session({
  secret: "shhhhh-super-secret",
  resave: true,
  saveUninitialized: true
}));

passport.serializeUser((user, cb) => {
  cb(null, user._id);
});

passport.deserializeUser((id, cb) => {
  User.findById(id, (err, user) => {
    if (err) { return cb(err); }
    cb(null, user);
  });
});



app.use(flash());

passport.use(new LocalStrategy((username, password, next) => {
  User.findOne({ username }, (err, user) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return next(null, false, { message: "Sorry we couldn't find that username" });
    }
    if (!bcrypt.compareSync(password, user.password)) {
      return next(null, false, { message: "Password not correct for that username" });
    }

    return next(null, user);
  });
}));


passport.use(new LinkedInStrategy({
  clientID: process.env.LINKEDINKEY,
  clientSecret: process.env.LINKEDINSECRET,
  callbackURL: "/auth/linkedin/callback",
  scope: ['r_emailaddress', 'r_liteprofile'],
}, async function(accessToken, refreshToken, profile, done) {
  // console.log(profile._json)
  const email = profile.emails[0].value;
  try {
      const userDB = await User.findOne({email});

      if(userDB) {
          done(null, userDB)
      } else {
          // console.log(profile)
          const newUser = new User();
          newUser.username = email;
          newUser.fullName = profile.displayName;
          newUser.email = email;
          newUser.linkedin = true;

          await newUser.save()
          return done(null, newUser)
      }

  } catch(err) {
      done(err)
  }
}));


app.use(passport.initialize());
app.use(passport.session());


app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  res.locals.msg         = req.flash('error')
  next();
});



const index = require('./routes/index');
app.use('/', index);


const userRoutes = require('./routes/user-routes');
app.use('/', userRoutes);

const portfolios = require('./routes/portfolio-routes');
app.use('/', portfolios);

module.exports = app;
