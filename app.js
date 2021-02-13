// require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt-nodejs');
const morgan = require('morgan');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(morgan("combined"));

//import knex as db for comunicate with database
const { db } = require('./model/database');

//import route
const register = require('./controllers/register');
const signinAuthentication = require('./controllers/sign');
const {profileGet, profileUpdate} = require('./controllers/profile');
const { image, callClarifaiApi } = require('./controllers/image');

const auth = require('./controllers/authorization')

//routers
app.get('/', (req, res) => res.json("working!"));
app.post('/register', register(bcrypt, db));
app.post('/signin', signinAuthentication(db,bcrypt));
app.get('/profile/:id', auth.requireAuth, profileGet(db));
app.post('/profile/:id', auth.requireAuth ,profileUpdate(db));
app.put('/image', auth.requireAuth, image(db));
app.post('/imageurl', auth.requireAuth, callClarifaiApi() );

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}
app.listen(port,()=> console.log(`app is running on port ${port}`));