/*
 * This file is used to control the views from the index page
 * and render different views depend on the anchor url
 */
var express = require('express');
var passport = require('passport');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Home',
                        message: 'My Portfolio',
                        displayName: req.user ? req.user.displayName : ''
                        });
});

/* GET index page which is the same as home page*/
router.get('/index', function(req, res, next) {
  res.render('index', { title: 'Home',
                        message: 'My Portfolio',
                        displayName: req.user ? req.user.displayName : ''
                        });
});

/* GET About Me page */
router.get('/about', function(req, res, next) {
    res.render('about', { title: 'About Me',
                          displayName: req.user ? req.user.displayName : ''
                        });
});

/* GET Projects page */
router.get('/project', function(req, res, next) {
    res.render('project', { title: 'Projects',
                          displayName: req.user ? req.user.displayName : ''
                          });
});

/* GET Services page */
router.get('/service', function(req, res, next) {
    res.render('service', { title: 'Services',
                          displayName: req.user ? req.user.displayName : ''
                          });
});

/* Render Login page. */
router.get('/login', function (req, res, next) {
    if (!req.user) {
        res.render('login', {
            title: 'Login',
            messages: req.flash('loginMessage'),
            displayName: req.user ? req.user.displayName : ''
        });
    }
    else {
        return res.redirect('/users');
    }
});

/* Process the Login Request */
router.post('/login', passport.authenticate('local-login', {
    successRedirect: '/businesscontacts',
    failureRedirect: '/login',
    failureFlash: true
}));

/* Show Registration Page */
router.get('/register', function (req, res, next) {
    if (!req.user) {
        res.render('register', {
            title: 'Register',
            messages: req.flash('registerMessage'),
            displayName: req.user ? req.user.displayName : ''
        });
    }
    else {
        return res.redirect('/');
    }
});

/* POST signup data. */
router.post('/register', passport.authenticate('local-registration', {
    //Success go to Profile Page / Fail go to Signup page
    successRedirect : '/users',
    failureRedirect : '/register',
    failureFlash : true
}));


/* Process Logout Request */
router.get('/logout', function (req, res){
  req.logout();
  res.redirect('/');
});

module.exports = router;
