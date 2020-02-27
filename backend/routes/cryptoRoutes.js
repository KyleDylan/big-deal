const express = require('express');
const router  = express.Router();
const Coin    = require('../models/coin');

const isLoggedIn = (req, res, next) => {
    console.log(req, req.user);
    if(req.isAuthenticated()){
        return next();
    }
    res.json({ error: 'not logged in' });
}

router.put('/coin', isLoggedIn, (req, res) => { 
    const crypto = req.body;
    Coin.findOneAndUpdate({ 'id' : req.user._id }, { $push: {coins: crypto} }, (err, coin) => {
        if(err){
            console.log(err);
        }
    })
});

router.delete('/coin', isLoggedIn, (req, res) => {
    const name = req.body.name;
    Coin.findOneAndUpdate({ 'id' : req.user.id }, { $pull: { coins: { 'name': name }}}, (err, coin) => {
        if(err){
            console.log(err);
        }
    })
});

router.get('/mylist', isLoggedIn, (req, res) => {
    Coin.findOne({ 'id' : req.user.id }, (err, coin) => {
        if(err){
            console.log(err);
        } res.send(coin.coins);
    })
})

module.exports = router;