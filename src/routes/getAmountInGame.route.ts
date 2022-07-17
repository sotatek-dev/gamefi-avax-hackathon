import * as express from "express";
const router = express.Router();
const getAmountInGame = require('../api/getAmountInGame.controller');

/* GET programming languages. */
router.post('/', async function(req, res, next) {
  try {
    let { gameId } = req.body.data
    res.json(await getAmountInGame.getAmountInGame(gameId) );
  } catch (err) {
    console.error(`Error `, err.message);
    next(err);
  }
});

module.exports = router;