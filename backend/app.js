const mongoose 		= require('mongoose'),
      cors          = require('cors'),
      express       = require('express'),
      session       = require('express-session'),
      cookieParser  = require("cookie-parser"),
    //   session       = require('cookie-session'),
      logger        = require('morgan'),
      bodyParser    = require('body-parser'),
      passport      = require('passport'),
      LocalStrategy = require('passport-local'),
      User          = require('./user'),
      Coin          = require('./coin');


const API_PORT = 3001;
const app = express();

const dbRoute = 'mongodb+srv://kyledabney:Gnireno8@cluster0-1yjnv.mongodb.net/test?retryWrites=true&w=majority';

mongoose.connect(dbRoute, { useNewUrlParser: true });

app.use(logger('dev'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
// app.use(session({keys: ['secretkey1', 'secretkey2', '...']}));

app.use(require('express-session')({
	secret: 'Death is inevitable, life is meaningless.',
	resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        maxAge: 5000000000
    }
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(bodyParser.json());

corsOptions = { origin: ['http://localhost:3000', 'http://localhost:3000/register', 'http://localhost:3000/login', 'http://localhost:3000/crypto'], credentials: true, vary: 'origin' };

app.use(cors(corsOptions));

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
    console.log(req.isAuthenticated());
    res.json({ username: req.user.username });
});

app.get('/logout', (req, res) => {
    req.logout();
    console.log(req.user);
    res.json({ message: 'logged out' });
});

app.post('/coin', isLoggedIn, (req, res) => {
    console.log(req);
    const name = req.body.name;
    const symbol = req.body.currency;
    const price = req.body.price;
    const change = req.body['1d'].price_change_pct;
    const marketcap = req.body.market_cap;
    const logo = req.body.logo_url;
    const username = req.user.username;
    const newCoins = { name: name, symbol: symbol, price: price, change: change, marketcap: marketcap, logo: logo, username: username };
    Coin.create(newCoins, (err, newC) => {
        if(err){
            console.log(err);
        } else {
            res.json({ success: 'success' });
        }
    })
});
    







app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));



