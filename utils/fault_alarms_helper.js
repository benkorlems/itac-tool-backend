const format_response = values => {
  let result_array = [];
  let result_object = {
    trap_id: "",
    message: "",
    action: "",
    trap_date: "",
    trap_state: "",
    color_code: ""
  };
  let color_codes = {
    danger: "#E57373",
    warning: "#E6EE9C",
    healthy: "#A5D6A7"
  };
  for (let i = 0; i < values.length; i++) {
    let trap = values[i];
    result_object["trap_id"] = trap[0].trap_id;
    result_object["message"] = trap[0].message;
    result_object["action"] = trap[0].action;
    result_object["trap_date"] = trap[0].trap_date;
    result_object["trap_state"] = trap[0].trap_state;
    switch (trap[0].message.trim()) {
      case "G-ONT/U unsynchronized":
        result_object["color_code"] = color_codes.danger;
        break;
      case "G - ONT / U(OLT side) LOSi":
        result_object["color_code"] = color_codes.danger;
        break;
      case "G - ONT(OLT side) DGi":
        result_object["color_code"] = color_codes.warning;
        break;
      case "G-ONT/U (OLT side) LOSi":
        result_object["color_code"] = color_codes.danger;
        break;
      case "G-ONT/U (OLT side) LOAMi":
        result_object["color_code"] = color_codes.danger;
        break;
      default:
        result_object["color_code"] = "";
    }
    result_array.push(result_object);
  }
  return result_array;
};

module.exports = { format_response: format_response };
