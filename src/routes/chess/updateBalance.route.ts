import * as express from "express";
const router = express.Router();
const doUpdateBalance = require('../../chess-controller/updateBalance.controller');

/* GET programming languages. */
router.post('/', async function(req, res, next) {
  try {
    let {address, balance} = req.body.data
    res.status(200);
    res.json(await doUpdateBalance.updateBalance(address, balance));
  } catch (err) {
    console.error(`Error `, err.message);
    next(err);
  }
});

module.exports = router;