const express = require('express');
const game = require('../models/game');

const router = express.Router();

// Find All
router.get('/', (req, res) => {
  game
    .findAll()
    .then(games => {
      if (!games.length) return res.status(404).send({ err: 'game not found' });
      res.json(games);
    })
    .catch(err => res.status(500).send(err));
});

// Find One by gameid
router.get('/:gameid', (req, res) => {
  game
    .findOneByGameId(req.params.gameid)
    .then(game => {
      if (!game) return res.status(404).send({ err: 'game not found' });
      res.json(game);
    })
    .catch(err => res.status(500).send(err));
});

// Create new game document
router.post('/', (req, res) => {
  game
    .create(req.body)
    .then(game => res.send(game))
    .catch(err => res.status(500).send(err));
});

// Update by gameid
router.put('/games/:gameid', (req, res) => {
  game
    .updateByGameId(req.params.gameid, req.body)
    .then(game => res.send(game))
    .catch(err => res.status(500).send(err));
});

// Delete All Games
router.delete('/games', (req, res) => {
  game
    .deleteAll()
    .then(() => res.sendStatus(200))
    .catch(err => res.status(500).send(err));
});

// Delete by gameid
router.delete('/games/:gameid', (req, res) => {
  game
    .deleteByGameId(req.params.gameid)
    .then(() => res.sendStatus(200))
    .catch(err => res.status(500).send(err));
});

module.exports = router;
