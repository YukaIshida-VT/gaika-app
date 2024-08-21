const express = require('express');
const session = require('express-session');
const passport = require('passport');
const TwitterStrategy = require('passport-twitter').Strategy;
const PrismaClient = require('@prisma/client').PrismaClient;
const prisma = new PrismaClient();
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: true,
}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new TwitterStrategy({
  consumerKey: process.env.TWITTER_CONSUMER_KEY,
  consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
  callbackURL: "http://localhost:5000/auth/twitter/callback"
}, async (accessToken, refreshToken, profile, done) => {
  let user = await prisma.user.findUnique({ where: { twitter_id: profile.id } });
  if (!user) {
    user = await prisma.user.create({
      data: {
        twitter_id: profile.id,
        twitter_icon: profile._json.profile_image_url_https,
      },
    });
  }
  return done(null, user);
}));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const user = await prisma.user.findUnique({ where: { id } });
  done(null, user);
});

app.get('/auth/twitter', passport.authenticate('twitter'));

app.get('/auth/twitter/callback', passport.authenticate('twitter', { failureRedirect: '/' }),
  (req, res) => {
    res.redirect('/');
  });

app.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

app.get('/user', (req, res) => {
  if (req.isAuthenticated()) {
    res.json(req.user);
  } else {
    res.status(401).json({ message: 'Unauthorized' });
  }
});

app.post('/applied-companies', async (req, res) => {
  if (req.isAuthenticated()) {
    const { url, company_name, applied_date } = req.body;
    const appliedCompany = await prisma.appliedCompany.create({
      data: {
        url,
        company_name,
        applied_date: new Date(applied_date),
        userId: req.user.id,
      },
    });
    res.json(appliedCompany);
  } else {
    res.status(401).json({ message: 'Unauthorized' });
  }
});

app.listen(5000, () => {
  console.log('Server running on http://localhost:5000');
});
