// require the snmp module
const snmp = require("net-snmp");
// require oids
const onu_recv_power_oid = "1.3.6.1.4.1.8886.18.3.6.3.1.1.16";

const gbagada_olt = "10.61.102.247";
const vgc_olt = "10.61.102.210";
const abuja_olt = "10.61.104.35";
const hq_olt = "10.61.102.211";

const session = snmp.createSession(gbagada_olt, "public");

const oids = ["1.3.6.1.4.1.8886.18.3.1.3.1.1.20"];

session.get(oids, function(error, varbinds) {
  if (error) {
    console.error(error);
  } else {
    for (var i = 0; i < varbinds.length; i++)
      if (snmp.isVarbindError(varbinds[i]))
        console.error(snmp.varbindError(varbinds[i]));
      else console.log(varbinds[i].oid + " = " + varbinds[i].value);
  }
  // If done, close the session
  session.close();
});

session.trap(snmp.TrapType.LinkDown, function(error) {
  if (error) console.error(error);
});
