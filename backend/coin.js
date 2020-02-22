
const mongoose = require('mongoose');

const CoinSchema = new mongoose.Schema({
	name: {
        type: String,
        unique: true
    },
    symbol: String,
    price: String,
    change: String,
    marketcap: String,
    logo: String,
    username: String
});

module.exports = mongoose.model('Coin', CoinSchema);



