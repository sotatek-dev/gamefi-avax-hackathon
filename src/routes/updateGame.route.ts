import * as express from "express";
const doUpdateGame = require('../api/updateGame.controller');
const router = express.Router();

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