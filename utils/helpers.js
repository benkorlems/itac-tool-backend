// Require the mysql promise
const mysql = require("promise-mysql");
// Require momentjs
const moment = require("moment");

// Require the ftthcliDB details
const { ftthCliDb, ftth_dynamic_mapsDb } = require("../config/dbConnection");

const format_response = values => {
  result_object = {
    admin_state: "Unavailable",
    operational_state: "Unavailable",
    olt_rx_power: "Unavailable",
    rx_power: "Unavailable",
    voice_ip: "Unavailable",
    vlan: "Unavailable",
    sync_state: "Unavailable",
    public_ip: "Unavailable",
    provisoned_bandwidth: "Unavailable",
    olt: "Unavailable",
    slot: "Unavailable",
    port: "Unavailable",
    ont: "Unavailable",
    ont_net_status: "Unavailable",
    last_poll: "Unavailable"
  };

  let olt_status_values = values[0][0];

  if (olt_status_values) {
    switch (olt_status_values.OnxNeStatus) {
      case "0":
        result_object["ont_net_status"] = "NoFailure";
        break;
      case "1":
        result_object["ont_net_status"] = "LossOfSignal";
        break;
      case "2":
        result_object["ont_net_status"] = "LossOfFraming";
        break;
      case "3":
        result_object["ont_net_status"] = "DriftOfWindow";
        break;
      case "4":
        result_object["ont_net_status"] = "SignalFail";
        break;
      case "5":
        result_object["ont_net_status"] = "SignalDegraded";
        break;
      case "6":
        result_object["ont_net_status"] = "LossGemChannel";
        break;
      case "7":
        result_object["ont_net_status"] = "RemoteDefectInd";
        break;
      case "8":
        result_object["ont_net_status"] = "StartUpFail";
        break;
      case "9":
        result_object["ont_net_status"] = "DeactivateFail";
        break;
      case "10":
        result_object["ont_net_status"] = "LossOfAck";
        break;
      case "11":
        result_object["ont_net_status"] = "DyingGasp";
        break;
      case "12":
        result_object["ont_net_status"] = "LossOfPloam";
        break;
      case "13":
        result_object["ont_net_status"] = "MessageError";
        break;
      case "14":
        result_object["ont_net_status"] = "LinkMismatch";
        break;
      case "15":
        result_object["ont_net_status"] = "PhyEqpError";
        break;
      case "16":
        result_object["ont_net_status"] = "TsInterfereWarn";
        break;
      case "17":
        result_object["ont_net_status"] = "TsInterfereAlarm";
        break;
      case "18":
        result_object["ont_net_status"] = "LossOfKey";
        break;
      case "2054":
        result_object["ont_net_status"] = "ONT Power outage";
        break;
      default:
        result_object["ont_net_status"] = "Unknown";
        break;
    }
    // Determine the ONT sync state
    switch (olt_status_values.OnxSyncState) {
      case "1":
        result_object["sync_state"] = "Other";
        break;
      case "2":
        result_object["sync_state"] = "Synchronized";
        break;
      case "3":
        result_object["sync_state"] = "Unsyncronized";
        break;
      case "4":
        result_object["sync_state"] = "WrongPassword";
        break;
      case "5":
        result_object["sync_state"] = "Disabled";
        break;
      case "6":
        result_object["sync_state"] = "Undiscovered serial no.";
        break;
      case "7":
        result_object["sync_state"] = "Wrong Serial Num";
        break;
      default:
        result_object["sync_state"] = "Unknown ";
        break;
    }
    // ONT Operational State
    switch (olt_status_values.OnxOperStatus) {
      case "0":
        result_object["operational_state"] = "Down";
        break;
      case "1":
        result_object["operational_state"] = "Up";
        break;
      default:
        result_object["operational_state"] = "Unknown";
        break;
    }

    let last_poll = "";
    last_poll = moment
      .unix(parseInt(olt_status_values.lastpoll))
      .format("MMMM Do YYYY, h:mm:ss a");
    if (last_poll == "Invalid date") {
      last_poll = "Not Available";
    }

    result_object.last_poll = last_poll;
    result_object.olt_rx_power = olt_status_values.RxPowerOlt;
    result_object.rx_power = olt_status_values.RxPowerOnx;
    result_object.olt = olt_status_values.olt;
    result_object.slot = olt_status_values.slot;
    result_object.port = olt_status_values.port;
    result_object.ont = olt_status_values.ont;
  }
  if (values[1][0]) {
    let ip_values = values[1][0];
    result_object["public_ip"] = ip_values.ipaddress;
  }

  return result_object;
};

const create_response = (serial, req, res) => {
  // Define query maps
  const queries = {
    query_for_public_ip: `select * from ftth_dynamic_maps where uid like "%${serial}%" limit 1`,
    query_for_ont_data_summary: `select * from ont_data_summary where ActOnxSn="${serial}" order by lastpoll desc limit 1 `
  };

  let promise0 = mysql
    .createConnection(ftthCliDb)
    .then(function(conn) {
      var result = conn.query(queries.query_for_ont_data_summary);
      conn.end();
      return result;
    })
    .catch(err => {
      throw err;
    });
  let promise1 = mysql
    .createConnection(ftth_dynamic_mapsDb)
    .then(function(conn) {
      var result = conn.query(queries.query_for_public_ip);
      conn.end();
      return result;
    })
    .catch(err => {
      throw err;
    });
  Promise.all([promise0, promise1])
    .then(values => {
      //res.json(values);
      res.json(format_response(values));
    })
    .catch(error => {
      //logs out the error
      throw error;
    });
};

module.exports = { create_response: create_response };
