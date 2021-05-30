const express = require('express');
const passport = require('passport')

// const passport = require('../config/passport');

const router = express.Router();

// Auth with Google
router.get('/google', passport.authenticate('google', {scope: ['profile']}))

// Google Auth callback
// get => aut/google/callback
router.get('/google/callback', passport.authenticate('google', {failureRedirect: '/'}), (req, res) => {
    res.redirect('/dashboard');
});


module.exports = router