const express = require('express');
const { User } = require('./model/database');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

//database connections
mongoose.set('useCreateIndex', true);
mongoose.set( 'useUnifiedTopology', 'true' );
mongoose.set('useFindAndModify', 'false');
mongoose.connect('mongodb://localhost:27017/smartBrainDB', { useNewUrlParser: true });

app.get('/', (req, res) => {
  User.find({}, function(err,foundUser) {
			if(!err) {
				res.json(foundUser);
			} else{
				res.json(err);
			}
		});
});

app.post('/register', (req, res) => {
  const newUser = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    entries: 0,
    joined: new Date().toLocaleString()
  });
  newUser.save(function (err) {
    if (!err) {
      res.json(newUser.toObject());
    } else {
      res.json(err);
    }
  });
});

app.post('/signin', (req, res) => {
  const { password, email } = req.body;
  User.findOne({email: email,password:password } , function(err,foundUser) {
      if (foundUser) {
				res.json(foundUser);
      } else {
        res.status(404).json("sorry wrong credentials!");
      }
	});
});

app.get('/profile/:id', (req, res) => {
  User.findOne({ _id: req.params.id } , function(err,foundUser) {
      if (foundUser) {
				res.json(foundUser);
      } else {
        res.status(404).json("No such user!");
      }
	});
});

app.put('/image', (req, res) => {
  const { id } = req.body;
  User.findOneAndUpdate(
  	{_id : id}, 
  	{ $inc:{entries: 1}},
  	{upsert:true},
  	function(err,updatedUser) {
  		if(!err) {
  			User.findOne({ _id: id } , function(err,foundUser) {
          if (foundUser) {
            res.json(foundUser);
          } else {
            res.status(404).json("No such user!");
          }
        });
  		} else {
  			res.json(err);
  		}
  	});
})

app.listen(3000, () => console.log("app is running on port 3000"));