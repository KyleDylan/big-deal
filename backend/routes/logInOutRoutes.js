const express  = require('express');
const passport = require('passport');
const router   = express.Router();
const User     = require('../models/user');
const Coin     = require('../models/coin');

router.post('/register', (req, res) => {
	const newUser = new User({username: req.body.username});
	User.register(newUser, req.body.password, (err, user) => {
		if(err){
			console.log(err);
		}
		passport.authenticate('local')(req, res, () => {
            res.json({ username: req.user.username });
            Coin.create({ id: req.user._id }, (err, coin) => {
                if(err){
                    console.log(err);
                }
            });
		});
    });
});

router.post('/login', passport.authenticate('local'), (req, res, next) => {
    console.log(req.isAuthenticated());
    res.json({ username: req.user.username });
});

router.get('/logout', (req, res) => {
    req.logout();
    res.json({ message: 'logged out' });
});

module.exports = router;