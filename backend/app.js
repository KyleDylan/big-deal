const mongoose 		= require('mongoose'),
      cors          = require('cors'),
      express       = require('express'),
      bodyParser    = require('body-parser'),
      passport      = require('passport'),
      LocalStrategy = require('passport-local'),
      User          = require('./data');


const API_PORT = 3001;
const app = express();

const dbRoute = 'mongodb+srv://kyledabney:Gnireno8@cluster0-1yjnv.mongodb.net/test?retryWrites=true&w=majority';

mongoose.connect(dbRoute, { useNewUrlParser: true });

app.use(require('express-session')({
	secret: 'Death is inevitable, life is meaningless.',
	resave: false,
	saveUninitialized: false
}));
app.use(cors());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.post('/register', (req, res) => {
	const newUser = new User({username: req.body.username});
	User.register(newUser, req.body.password, (err, user) => {
		if(err){
			console.log(err);
		}
		passport.authenticate('local')(req, res, () => {
			res.json({success: 'success'});
		});
	});
});

app.post('/login', (req, res, next) => {
    next()
}, passport.authenticate('local'), (req, res) => {
    console.log(req);
    res.json({ success: 'success' });
});





app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));



