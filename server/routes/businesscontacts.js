var express = require('express');
var passport = require('passport');
var router = express.Router();

var Businesscontact = require('../models/businesscontact');

/* Utility functin to check if user is authenticatd */
function requireAuth(req, res, next){

  // check if the user is logged in
  if(!req.isAuthenticated()){
    res.redirect('/login');
  }
  next();
}

/* Render Business Contact List main page. */
router.get('/', requireAuth, function (req, res, next) {
    Businesscontact.find(function (err, businesscontacts) {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            res.render('businesscontacts/index', {
                title: 'Businesscontact',
                businesscontacts: businesscontacts,
                displayName: req.user ? req.user.displayName : ''
            });
        }
    }).sort({"contactName":1}); //sort the list by contactName in ascending
});

/* Render the Add business contact Page */
router.get('/add', requireAuth, function (req, res, next) {
    res.render('businesscontacts/add', {
        title: 'Businesscontact',
        displayName: req.user ? req.user.displayName : ''
    });
});

/* process the submission of a new business contact */
router.post('/add', requireAuth, function (req, res, next) {
    var businesscontact = new Businesscontact(req.body);
    Businesscontact.create({
        contactName: req.body.contactName,
        phone: req.body.phone,
        email: req.body.email,
        provider: 'local'
    }, function (err, Businesscontact) {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            res.redirect('/businesscontacts');
        }
    });
});

/* Render the Business Contact Edit Page */
router.get('/:id', requireAuth, function (req, res, next) {
    // create an id variable
    var id = req.params.id;
    // use mongoose and our model to find the right business contact
    Businesscontact.findById(id, function (err, businesscontact) {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            //show the edit view
            res.render('businesscontacts/edit', {
                title: 'Businesscontact',
                businesscontact: businesscontact,
                displayName: req.user ? req.user.displayName : ''
            });
        }
    });
});

/* process the edit form submission */
router.post('/:id', requireAuth, function (req, res, next) {
    var id = req.params.id;
    var businesscontact = new Businesscontact(req.body);
    businesscontact._id = id;
    
    // use mongoose to do the update
    Businesscontact.update({ _id: id }, businesscontacts, function (err) {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            res.redirect('/businesscontacts');
        }
    });
});

/* run delete on the selected business contact */
router.get('/delete/:id', requireAuth, function (req, res, next) {
    var id = req.params.id;
    Businesscontact.remove({ _id: id }, function (err) {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            res.redirect('/businesscontacts');
        }
    });
});

module.exports = router;
