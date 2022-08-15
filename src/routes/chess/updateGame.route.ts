import * as express from "express";
const router = express.Router();
const doUpdateGame = require('../../chess-controller/updateGame.controller');

/* GET programming languages. */
router.post('/', async function(req, res, next) {
  try {
    let {address, amount} = req.body.data
    res.json(await doUpdateGame.updateGame(address, amount));
  } catch (err) {
    console.error(`Error `, err.message);
    next(err);
  }
});

module.exports = router;