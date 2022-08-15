import * as express from "express";
const router = express.Router();
const doUpdateBalance = require('../../osu-controller/updateBalance.controller')

router.post('/', async function(req, res, next) {
  try {
    let {address, balance} = req.body.data
    res.json(await doUpdateBalance.updateBalance(address, balance));
  } catch (err) {
    console.error(`Error `, err.message);
    next(err);
  }
});

module.exports = router;