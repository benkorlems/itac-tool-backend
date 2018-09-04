const express = require("express");

const router = express.Router();

const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectID;

// get the mongo db url
// Import the db connections
const { mongo_url } = require("../../config/dbConnection");

// Connect to the db

// Get the helper functions
const { format_response } = require("../../utils/fault_alarms_helper");

// @route   GET api/profile/test
// @desc    Tests users route
// @access  public

router.get("/test", (req, res) => {
  res.json(req.query.serial);
});

// @route   GET api/billing/all_billing
// @desc    Tests users route
// @access  public

router.get("/get_alarms", (req, res) => {
  console.log(req.query);
  let olt = req.query.olt;
  let slot = req.query.slot;
  let port = req.query.port;
  MongoClient.connect(
    mongo_url,
    function(err, db) {
      if (err) throw err;
      var dbo = db.db("fos_traps_db");
      let query = {
        "0.olt": olt,
        "0.slot": slot,
        "0.port": port,
        _id: {
          $gt: ObjectId.createFromTime(Date.now() / 1000 - 24 * 60 * 60)
        }
      };
      dbo
        .collection("traps")
        .find(query)
        .toArray(function(err, result) {
          if (err) throw err;
          res.json(format_response(result));
          db.close();
        });
    }
  );
});

module.exports = router;
