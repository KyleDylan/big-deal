
const mongoose = require('mongoose');

const CoinSchema = new mongoose.Schema({
    coins: [],
    id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

module.exports = mongoose.model('Coin', CoinSchema);




