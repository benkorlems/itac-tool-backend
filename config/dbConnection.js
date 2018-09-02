const mysql = require("mysql");

const billingDbConn = mysql.createConnection({
  host: "10.50.0.11",
  user: "root",
  password: "ipnx1234",
  database: "ftthmonitor_billing",
  supportBigNumbers: true,
  bigNumberStrings: true
});

const ftthCliDb = {
  host: "10.50.0.11",
  user: "root",
  password: "ipnx1234",
  database: "ftthmonitor_cli"
};

const ftth_dynamic_mapsDb = {
  host: "62.173.34.213",
  user: "root",
  password: "ipNX123",
  database: "csms"
};

module.exports = {
  billingDbConn: billingDbConn,
  ftthCliDb: ftthCliDb,
  ftth_dynamic_mapsDb: ftth_dynamic_mapsDb
};
