// require the net-snmp module
const snmp = require("net-snmp");
// require helper functions
const { feedCb_type1, feedCb_type2, doneCb } = require("./helpers.snmp");

const session = snmp.createSession(gbagada_olt, "public");

// snmp session subtree
session.subtree(uni_octets_in_ethernet_oid, feedCb_type1, doneCb);
