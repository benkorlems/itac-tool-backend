// require the net-snmp module
const snmp = require("net-snmp");
// require helper functions
const {
  process_snmp_data_type1,
  process_snmp_data_type2
} = require("./helpers.snmp");

// require oids
const onu_recv_power_oid = "1.3.6.1.4.1.8886.18.3.6.3.1.1.16";
const onu_status_oid = "1.3.6.1.4.1.8886.18.3.1.3.1.1.17";
const onu_active_state_oid = "1.3.6.1.4.1.8886.18.3.1.3.1.1.18";

const uni_octets_in_ethernet_oid = "1.3.6.1.4.1.8886.18.3.6.5.2.1.2";

const gbagada_olt = "10.61.102.247";
const vgc_olt = "10.61.102.210";
const abuja_olt = "10.61.104.35";
const hq_olt = "10.61.102.211";

const session = snmp.createSession(gbagada_olt, "public");

/**
 * SNMP WALK IMPLEMENTATION USING NET-SNMP.JS (SUBTREE)
 ******************************************/

function doneCb(error) {
  if (error) console.error(error.toString());
}

function feedCb(varbinds) {
  let oid;
  let value;
  for (let i = 0; i < varbinds.length; i++) {
    if (snmp.isVarbindError(varbinds[i])) {
      //console.error(snmp.varbindError(varbinds[i]));
      console.log("ERROR!");
    } else {
      // console.log(varbinds[i].oid + "=" + varbinds[i].value);
      oid = varbinds[i].oid;
      value = varbinds[i].value;
      process_snmp_data_type1(oid, value);
    }
  }
}
// let maxRepetitions = 1;
// The maxRepetitions argument is optional default = 20, and will be ignored unless using
// SNMP verison 2c
// session.walk(onu_active_state_oid, maxRepetitions, feedCb, doneCb);
session.subtree(uni_octets_in_ethernet_oid, feedCb, doneCb);
