const express = require("express");

const router = express.Router();

// Get the helper functions
const { create_response } = require("../../utils/helpers");

// @route   GET api/profile/test
// @desc    Tests users route
// @access  public

router.get("/test", (req, res) => {
  res.json(req.query.serial);
});

// @route   GET api/billing/all_billing
// @desc    Tests users route
// @access  public

router.get("/ont_status", (req, res) => {
  let serial = req.query.serial;
  create_response(serial, req, res);
});

module.exports = router;
