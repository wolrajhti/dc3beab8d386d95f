import express from 'express';
import passport from 'passport';
import bodyParser from 'body-parser';
import Localstrategy from 'passport-local';
import session from 'express-session';
import { MongoClient, ObjectId } from 'mongodb';
import { MdbUserRepository } from './infra/mdbUser.repository.mts';
import { type IUser, User } from './domain/user.mts';
import { PasswordHashService } from './domain/passwordHash.service.mts';
import { resolve } from 'node:path';
import isemail from 'isemail';

// initialisation des services
const client = await MongoClient.connect('mongodb://127.0.0.1:21664');
const collection = client.db('bonx').collection('user');

if (!(await collection.indexExists('unique_email'))) {
  console.log('creating index to avoid multiple account with same email');
  collection.createIndex(['email', 1], {name: 'unique_email', unique: true});
}

const userRepository = new MdbUserRepository(collection);
const passwordService = new PasswordHashService();

// setup de passport
passport.serializeUser(function(user: User, cb) {
  process.nextTick(function() {
    return cb(null, {
      id: user._id,
      email: user.email
    });
  });
});

passport.deserializeUser(function(user: IUser, cb) {
  process.nextTick(function() {
    return cb(null, new User(user));
  });
});

passport.use('local', new Localstrategy(
  async function(email, password, done) {
    userRepository.findByEmail(email)
      .then(async user => {
        if (!user) {
          return done(null, false);
        }
        if (!(await passwordService.verify(user.passwordHash, password))) {
          return done(null, false);
        }
        return done(null, user);
      })
      .catch(done);
  }
));

const app = express();

app.use(session({secret: 'MY_SECRET'}));
app.use(passport.session());

// route d'api pour se logger
app.post('/login', bodyParser.urlencoded(), passport.authenticate('local', { failureRedirect: '/login' }), (req, res) => {
  res.redirect('/home');
});

// on supprime sa session et on le redirige sur l'interface de login
app.get('/logout', (req: any, res, next) => {
  if (req.isAuthenticated()) {
    (req as any).logout(() => res.redirect('/login'));
  } else {
    res.redirect('/login');
  }
});

// route d'api pour créer un compte
app.post('/signup', bodyParser.urlencoded(), async (req, res) => {
  if (!isemail.validate(req.body.username)) {
    throw new Error('Email invalide');
  }
  if (
    typeof req.body.password !== 'string' ||
    req.body.password !== req.body.password2
  ) {
    throw new Error('Mot de passe invalide');
  }
  const user = new User({
    _id: new ObjectId().toHexString(),
    email: req.body.username,
    passwordHash: await passwordService.hash(req.body.password)
  });
  await userRepository.register(user);
  res.redirect('/login');
});

// API protégée par authentification
const router = express.Router();

router.use((req: any, res, next) => {
  if (!req.isAuthenticated()) {
    res.sendStatus(401);
  } else {
    next();
  }
});

// on retourne l'utilisateur courant pour illustrer qu'on est bien authentifié
router.get('/me', (req: any, res, next) => {
  res.json(req.user.toJSON());
});

app.use('/api', router);

// on setup quelques redirection
app.get('/login', (req: any, res, next) => {
  if (req.isAuthenticated()) {
    res.redirect('/home');
  } else {
    next();
  }
});

// on sert l'app
app.use(express.static('../bonx-login/dist')); // assets & co
app.use('/*splat', (req, res, next) => {
  res.sendFile(resolve('../bonx-login/dist', 'index.html')); // fallback pour toujours servir notre index.html
});

// on démarre le serveur
app.listen(3000, () => {
  console.log('listening on 3000');
});

