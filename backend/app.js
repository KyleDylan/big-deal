const mongoose 		= require('mongoose'),
      cors          = require('cors'),
      express       = require('express'),
      session       = require('express-session'),
      cookieParser  = require("cookie-parser"),
      logger        = require('morgan'),
      bodyParser    = require('body-parser'),
      passport      = require('passport'),
      LocalStrategy = require('passport-local'),
      User          = require('./models/user');

const logInOutRoutes = require('./routes/logInOutRoutes'),
      cryptoRoutes   = require('./routes/cryptoRoutes');

      
const API_PORT = 3001;
const app = express();

const dbRoute = 'mongodb+srv://kyledabney:Gnireno8@cluster0-1yjnv.mongodb.net/test?retryWrites=true&w=majority';

mongoose.connect(dbRoute, { useNewUrlParser: true });

app.use(logger('dev'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());

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

const corsOptions = { origin: 'http://localhost:3000*', credentials: true, vary: 'origin' };

// const corsOptions = { origin: ['http://localhost:3000', 'http://localhost:3000/register', 'http://localhost:3000/login', 'http://localhost:3000/crypto'], credentials: true, vary: 'origin' };

app.use(cors(corsOptions));

app.use(logInOutRoutes);
app.use(cryptoRoutes);




app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));



