// Extracts the index part from the OID
const get_ont_index = oid => {
  let regex = /\d{7,10}/;
  // get the ont_index from the regex match array
  let ont_index = oid.match(regex)[0];
  return parseInt(ont_index);
};

// Decimal to binary converter
const dec2bin = dec => {
  return (dec >>> 0).toString(2);
};

// Binary to decimal converter
const bin2dec = bin => {
  return parseInt(bin, 2).toString(10);
};

/**
 * This function takes the oid & value from snmp walk and
 * returns json obj for type1 indexes
 */

const process_snmp_data_type1 = (oid, value) => {
  // Declear variables
  let result_obj = {
    metric: "",
    slot: "",
    port: "",
    onu_id: "",
    value: "",
    timestamp: ""
  };

  // Get the ont_index
  let ont_index = get_ont_index(oid);
  // Convert ont_index to an integer and subtract 1
  ont_index = parseInt(ont_index) - 1;

  // Divisions
  let slot = Math.floor(ont_index / 1e7);
  ont_index = ont_index % 1e7;
  // Get port
  let port = Math.floor(ont_index / 1e5);
  ont_index = ont_index % 1e5;
  // Get ONT id
  let onu_id = Math.floor(ont_index / 1e3);

  // Set result values
  result_obj.slot = slot;
  result_obj.port = port;
  result_obj.onu_id = onu_id;
  result_obj.value = value;
  result_obj.timestamp = Date.now();

  console.log(result_obj);
};

/**
 * This function takes the oid & value from snmp walk and
 * returns json obj for type2 indexes
 */

const process_snmp_data_type2 = (oid, value) => {
  // Declear variables
  let result_obj = {
    metric: "",
    slot: "",
    port: "",
    onu_id: "",
    value: "",
    timestamp: ""
  };
  let ont_index;
  let ont_index_bin;
  let slot_bin;
  let port_bin;
  let onu_id;

  // Get the ont_index
  ont_index = get_ont_index(oid);

  // Convert the index to binary
  ont_index_bin = dec2bin(ont_index);

  // Slice out the slot port and onu_id
  slot_bin = ont_index_bin.slice(1, 6);
  port_bin = ont_index_bin.slice(7, 13);
  onu_id = ont_index_bin.slice(13);

  // Set result values
  result_obj.slot = bin2dec(slot_bin);
  result_obj.port = bin2dec(port_bin);
  result_obj.onu_id = bin2dec(onu_id);
  result_obj.value = value;
  result_obj.timestamp = Date.now();

  console.log(result_obj);
};

module.exports = { process_snmp_data_type1, process_snmp_data_type2 };
