import * as express from "express";
const router = express.Router();
const doUpdateGame = require('../api/updateGameComp.controller')

/* GET programming languages. */
router.post('/', async function(req, res, next) {
  try {
    // let {address_1, address_2, amount} = req.body.data
    // res.json(await doUpdateGame.updateGame(address_1, address_2, amount));
    let {address, amount, game_id, message, signature, winner} = req.body.data
    res.json(await doUpdateGame.doUpdateGame(address, amount, game_id, message, signature, winner));
  } catch (err) {
    console.error(`Error `, err.message);
    next(err);
  }
});

module.exports = router;