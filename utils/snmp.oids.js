snmp_oid_type1 = {
  onu_device_type_oid: "1.3.6.1.4.1.8886.18.3.6.1.1.1.10",
  onu_hw_revision_oid: "1.3.6.1.4.1.8886.18.3.6.1.1.1.3",
  onu_match_state_oid: "1.3.6.1.4.1.8886.18.3.6.1.1.1.34",
  onu_sysuptime_oid: "1.3.6.1.4.1.8886.18.3.6.1.1.1.18",
  onu_pon_temp_oid: "1.3.6.1.4.1.8886.18.3.6.3.1.1.18",
  onu_reboot_oid: "1.3.6.1.4.1.8886.18.3.6.1.1.1.23",
  onu_tx_power_oid: "1.3.6.1.4.1.8886.18.3.6.3.1.1.17",
  onu_rx_power_oid: "1.3.6.1.4.1.8886.18.3.6.3.1.1.16",
  uni_port_link_oid: "1.3.6.1.4.1.8886.18.3.6.5.1.1.8",
  uni_port_admin_oid: "1.3.6.1.4.1.8886.18.3.6.5.1.1.7",
  uni_port_admin_set_oid: "1.3.6.1.4.1.8886.18.3.6.5.1.1.7",
  uni_port_autong_oid: "1.3.6.1.4.1.8886.18.3.6.5.1.1.15",
  uni_port_flowctrl_oid: "1.3.6.1.4.1.8886.18.3.6.5.1.1.17",
  uni_port_nativevlan_oid: "1.3.6.1.4.1.8886.18.3.6.5.1.1.20",
  uni_port_speed_duplex_oid: "1.3.6.1.4.1.8886.18.3.6.5.1.1.6",
  uni_octets_in_ethernet_oid: "1.3.6.1.4.1.8886.18.3.6.5.2.1.2",
  uni_octets_out_ethernet_oid: "1.3.6.1.4.1.8886.18.3.6.5.2.1.15"
};

snmp_oid_type1 = {
  onu_status_oid: "1.3.6.1.4.1.8886.18.3.1.3.1.1.17",
  onu_last_online_oid: "1.3.6.1.4.1.8886.18.3.1.3.1.1.14",
  onu_offline_reason_oid: "1.3.6.1.4.1.8886.18.3.1.3.1.1.15",
  onu_sn_oid: "1.3.6.1.4.1.8886.18.3.1.3.1.1.2",
  line_profile_oid: "1.3.6.1.4.1.8886.18.3.1.3.1.1.6",
  line_profile_name_oid: "1.3.6.1.4.1.8886.18.3.1.3.1.1.7",
  service_profile_oid: "1.3.6.1.4.1.8886.18.3.1.3.1.1.8",
  service_profile_name_oid: "1.3.6.1.4.1.8886.18.3.1.3.1.1.9",
  row_status_oid: "1.3.6.1.4.1.8886.18.3.1.3.1.1.19",
  description_oid: "1.3.6.1.4.1.8886.18.3.1.3.1.1.20",
  onu_active_state_oid: "1.3.6.1.4.1.8886.18.3.1.3.1.1.18",
  olt_rx_power_oid: "1.3.6.1.4.1.8886.18.3.1.3.3.1.1",
  onu_register_distance_oid: "1.3.6.1.4.1.8886.18.3.1.3.1.1.16"
};

module.exports = { snmp_oid_type1, snmp_oid_type2 };
