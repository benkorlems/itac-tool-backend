const express = require("express");

const router = express.Router();

// Import the db connections
const { billingDbConn, ftthCliDbConn } = require("../../config/dbConnection");

// @route   GET api/profile/test
// @desc    Tests users route
// @access  public
router.get("/test", (req, res) => {
  ftthCliDbConn.query(
    `select * from YABA_OLT_ONT where ActOnxsn = 'RCMG18480EE7' limit 1`,
    (err, result, fields) => {
      res.send(!result[0] === undefined);
    }
  );
});

// @route   GET api/billing/all_billing
// @desc    Tests users route
// @access  public
router.get("/all_billing", (req, res) => {
  let latest_table;
  billingDbConn.query(
    "select * from poll_tables order by sn desc limit 1",
    (err, result, fields) => {
      if (err) {
        return res.status(400).json({ err });
      }
      latest_table = result[0].trecord;

      let billing_query = `select * ${latest_table} left join contact_info on ${latest_table}.agent_custid = contact_info.agent_custid`;
      billingDbConn.query(billing_query, (err, result, fields) => {
        if (err) {
          return res.status(400).json({ err });
        }
        res.status(200).json(result);
      });
    }
  );
});

router.get("/search_billing", (req, res) => {
  let latest_table;
  billingDbConn.query(
    "select * from poll_tables order by sn desc limit 1",
    (err, result, fields) => {
      if (err) {
        return res.status(400).json({ err });
      }
      latest_table = result[0].trecord;

      let search_term = req.query.search_term;
      console.log(search_term);

      let billing_query = `SELECT DISTINCT ${latest_table}.finger, contact_info.address1, contact_info.agent_custid, ${latest_table}.last_bill, ${latest_table}.bill, ${latest_table}.susp, ${latest_table}.pkg, contact_info.username, contact_info.phone1, ${latest_table}.totalbytes_threshold, ${latest_table}.totalbytes from ${latest_table} left join contact_info on ${latest_table}.username=contact_info.username where ${latest_table}.finger like "%${search_term}%" OR ${latest_table}.username like "%${search_term}%" limit 150`;

      billingDbConn.query(billing_query, (err, result, fields) => {
        if (err) {
          return res.status(400).json({ err });
        }
        res.json(result);
      });
    }
  );
});

module.exports = router;
