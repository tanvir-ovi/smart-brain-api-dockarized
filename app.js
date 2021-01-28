require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt-nodejs');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

//import knex as db for comunicate with database
const { db } = require('./model/database');

//import route
const register = require('./controllers/register');
const signin = require('./controllers/sign');
const profileGet = require('./controllers/profile');
const {image, callClarifaiApi} = require('./controllers/image');

//routers
app.get('/', (req, res) => res.json("working!"));

app.post('/register', register(bcrypt, db));

app.post('/signin', signin(db,bcrypt));

app.get('/profile/:id', profileGet(db));

app.put('/image', image(db));
app.post('/imageurl', callClarifaiApi() );

app.listen(3000, () => console.log("app is running on port 3000"));