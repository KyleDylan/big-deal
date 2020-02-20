const mongoose 		= require('mongoose'),
      cors          = require('cors'),
      express       = require('express'),
      session       = require('express-session'),
      cookieParser  = require("cookie-parser"),
      bodyParser    = require('body-parser'),
      passport      = require('passport'),
      LocalStrategy = require('passport-local'),
      User          = require('./user'),
      Coin          = require('./coin');


const API_PORT = 3001;
const app = express();

const dbRoute = 'mongodb+srv://kyledabney:Gnireno8@cluster0-1yjnv.mongodb.net/test?retryWrites=true&w=majority';

mongoose.connect(dbRoute, { useNewUrlParser: true });
app.use(cookieParser('secret'));

app.use(require('express-session')({
	secret: 'Death is inevitable, life is meaningless.',
	resave: false,
	saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

corsOptions = { origin: true, credentials: true };

app.use(cors(corsOptions));
app.use(express.static("public"));

app.post('/register', (req, res) => {
	const newUser = new User({username: req.body.username});
	User.register(newUser, req.body.password, (err, user) => {
		if(err){
			console.log(err);
		}
		passport.authenticate('local')(req, res, () => {
            res.json({ username: req.user.username });
		});
	});
});

const isLoggedIn = (req, res, next) => {
    console.log(req, req.user);
    if(req.isAuthenticated()){
        return next();
    }
    res.json({ error: 'not logged in' });
}

app.post('/login', passport.authenticate('local'), (req, res, next) => {
    console.log(req.user);
    res.json({ username: req.user.username });
});

app.get('/logout', (req, res) => {
    req.logout();
    res.json({ success: 'success' });
});

app.post('/coin', (req, res, next) => {
    console.log(req, req.user);
    res.json({ eh: 'eh' });
});
    // const name = req.body.newCoin.name;
    // const symbol = req.body.newCoin.currency;
    // const price = req.body.newCoin.price;
    // const change = req.body.newCoin['1d'].price_change_pct;
    // const marketcap = req.body.newCoin.market_cap;
    // const logo = req.body.newCoin.logo_url;
    // const username = req.body.username;
    // const newCoins = { name: name, symbol: symbol, price: price, change: change, marketcap: marketcap, logo: logo, username: username };
    // Coin.create(newCoins, (err, newC) => {
    //     if(err){
    //         console.log(err);
    //     } else {
    //         res.json({ success: 'success' });
    //     }
    // })







app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));



