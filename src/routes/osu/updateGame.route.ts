import * as express from "express";
const router = express.Router();
const updateGame = require('../../osu-controller/updateGame.controller');

router.post('/', async function(req, res, next) {
  try {
    let {address, amount} = req.body.data
    res.json(await updateGame.doUpdateGame(address, amount));
  } catch (err) {
    console.error(`Error `, err.message);
    next(err);
  }
});

module.exports = router;