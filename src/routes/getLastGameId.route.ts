import * as express from "express";
const router = express.Router();
const doGetLastGameId = require('../api/getLastGameId.controller');

/* GET programming languages. */
router.get('/', async function(req, res, next) {
  try {
    res.json(await doGetLastGameId.getLastGameId() );
  } catch (err) {
    console.error(`Error `, err.message);
    next(err);
  }
});

module.exports = router;