// Require the mysql promise
const mysql = require("promise-mysql");

// Require the ftthcliDB details
const { ftthCliDb, ftth_dynamic_mapsDb } = require("../config/dbConnection");

const format_response = values => {
  result_object = {
    admin_state: "",
    operational_state: "",
    olt_rx_power: "",
    rx_power: "",
    voice_ip: "",
    vlan: "",
    sync_state: "",
    rx_power: "",
    public_ip: "",
    provisoned_bandwidth: "",
    olt: "",
    slot: "",
    port: "",
    mst: "",
    ont: "",
    ont_net_status: "",
    olt: "",
    slot: "",
    port: "",
    ont: ""
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
  }
  if (values[1][0]) {
    let ip_values = values[1][0];
    result_object["public_ip"] = ip_values.ipaddress;
  }
  result_object["olt"] = olt_status_values.olt;
  result_object["slot"] = olt_status_values.solt;
  result_object["port"] = olt_status_values.port;
  result_object["ont"] = olt_status_values.ont;

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
    .then(conn => conn.query(queries.query_for_ont_data_summary));
  let promise1 = mysql
    .createConnection(ftth_dynamic_mapsDb)
    .then(conn => conn.query(queries.query_for_public_ip));
  Promise.all([promise0, promise1])
    .then(values => {
      res.json(format_response(values));
    })
    .catch(error => {
      //logs out the error
      console.log(error);
    });
};

module.exports = { create_response: create_response };
