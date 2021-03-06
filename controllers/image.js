const Clarifai = require('clarifai');
const { response } = require('express');

const app = new Clarifai.App({ apiKey: 'f565ee4b503c4fa3bce459905ea9da36' });

const callClarifaiApi = () => (req, res) => {
  app.models
    .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then(response => res.json(response))
    .catch(err => res.status(400).json("unable to calling API"));
}

const image = (db) => (req, res) => {
  const { id } = req.body;
  db('users').where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entry => {
      res.json(entry[0]);
    })
    .catch(err =>res.status(400).json("error getting in"))
}

module.exports = {
  image,
  callClarifaiApi
};