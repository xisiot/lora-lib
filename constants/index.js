module.exports = new function () {
  this.APPEUI_LEN = 8;
  this.DEVEUI_LEN = 8;
  this.GWEUI_LEN = this.DEVEUI_LEN;
  this.DEVADDR_LEN = 4;
  this.GATEWAYID_LEN = 8;
  this.APPKEY_LEN = 16;
  this.DEVNONCE_LEN = 2;
  this.APPNONCE_LEN = 3;
  this.JOINREQ_BASIC_LENGTH = this.APPEUI_LEN + this.DEVEUI_LEN + this.DEVNONCE_LEN;
  this.NETID_LEN = 3;
  this.NWKID_LEN = 1;
  this.NWKID_OFFSET = 2;
  this.DLSETTINGS_LEN = 1;
  this.DEFAULT_DLSETTINGS = Buffer.alloc(this.DLSETTINGS_LEN);
  this.RX2DR_OFFSET = 0;
  this.RX2DR_LEN = 4;
  this.RX1DROFFSET_OFFSET = this.RX2DR_OFFSET + this.RX2DR_LEN;
  this.RX1DROFFSET_LEN = 3;
  this.OPTNEG_OFFSET = this.RX1DROFFSET_OFFSET + this.RX1DROFFSET_LEN;
  this.OPTNEG_LEN = 1;
  this.RXDELAY_BITOFFSET = 0;
  this.RXDELAY_BITLEN = 4;
  this.RXDELAY_LEN = 1;

  this.NWKSKEY_LEN = 16;
  this.APPSKEY_LEN = 16;
  this.DIRECTION_LEN = 1;
  this.ACTIVATION_MODE = [
    'OTAA',
    'ABP',
  ];
  this.BUF_LIST = [
    'AppEUI',
    'DevEUI',
    'AppKey',
    'AppNonce',
    'DevNonce',
    'AppSKey',
    'NwkSKey',
    'DevAddr',
    'NetID',
    'NwkID',
    'gatewayId',
    'identifier',
  ];

  this.FREQUENCY_PLAN_LIST = [433, 915, 868, 787];
  this.PLANOFFSET915 = 1;
  this.CFLISTJSON = {
    433: '330A6833029832FAC832F2F832EB2832E35832DB8832D3B8',
    915: '7CC5687CBD987CB5C87CADF87CA6287C9E587C96887C8EB8',
    868: '756A987562C8755AF8755328754B58754388753BB87533E8',
    787: '67E5A867DDD867D60867CE3867C66867BE9867B6C867AEF8',
  };
  this.DEFAULTCHDRRANGE = '5050505050505050';
  this.DEFAULTCONF = {
    433: {
      frequencyPlan: 433,
      ChMask: '00FF',
      CFList: this.CFLISTJSON[433],
      ChDrRange: this.DEFAULTCHDRRANGE,
      RX1CFList: this.CFLISTJSON[433],
      RX2Freq: 434.665,
      RX2DataRate: 0,
      MaxEIRP: 12.15,
    },
    915: {
      frequencyPlan: 915,
      ChMask: 'FF00000000000000FF',
      CFList: this.CFLISTJSON[915],
      ChDrRange: this.DEFAULTCHDRRANGE,
      RX1CFList: '7E44387E2CC87E15587DFDE87DE6787DCF087DB7987DA028',
      RX2Freq: 923.300,
      RX2DataRate: 8,
      MaxEIRP: 30,
    },
    868: {
      frequencyPlan: 868,
      ChMask: '00FF',
      CFList: this.CFLISTJSON[868],
      ChDrRange: this.DEFAULTCHDRRANGE,
      RX1CFList: this.CFLISTJSON[868],
      RX2Freq: 869.525,
      RX2DataRate: 0,
      MaxEIRP: 16,
    },
    787: {
      frequencyPlan: 787,
      ChMask: '00FF',
      CFList: this.CFLISTJSON[787],
      ChDrRange: this.DEFAULTCHDRRANGE,
      RX1CFList: this.CFLISTJSON[787],
      RX2Freq: 786.000,
      RX2DataRate: 0,
      MaxEIRP: 12.15,
    },
  };

  // Default frequency of received window (2)
  this.DEFAULT_FREQ = [433.700, 916.700, 869.525, 786.000];

  // Default datarate offset between received window 1 and tx
  this.DEFAULT_RX1DROFFSET = [4, 1, 1, 1];

  // Default datarate of received window 2
  this.DEFAULT_RX2DR = [0, 8, 0, 0];

  // Default RxDelay for RX1 is 1000 ms
  this.DEFAULT_RX1DELAY = 1000;

  this.DOWNLINK_MQ_PREFIX = 'lora:as:appdata:';
  this.DOWNLINK_DELAY = 300;
  this.DEDUPLICATION_DURATION = 200;
  this.COLLECTKEYTEMP_PREFIX = "lora:ns:rx:collect:"
  this.COLLECTLOCKKEYTEMP_PREFIX = "lora:ns:rx:collect:lock:"
  this.MACCOMMANDPORT = Buffer.from('00', 'hex');

  this.MAX_FCNT_DIFF = 50;
  /* data rate parameters */
  this.DR433 = {
    SF12BW125: 'DR0',
    SF11BW125: 'DR1',
    SF10BW125: 'DR2',
    SF9BW125: 'DR3',
    SF8BW125: 'DR4',
    SF7BW125: 'DR5',
    SF7BW250: 'DR6',
  };

  this.RX1DROFFSET433TABLE = {
    DR0: Array(6).fill('DR0'),
    DR1: ['DR1', 'DR0', 'DR0', 'DR0', 'DR0', 'DR0'],
    DR2: ['DR2', 'DR1', 'DR0', 'DR0', 'DR0', 'DR0'],
    DR3: ['DR3', 'DR2', 'DR1', 'DR0', 'DR0', 'DR0'],
    DR4: ['DR4', 'DR3', 'DR2', 'DR1', 'DR0', 'DR0'],
    DR5: ['DR5', 'DR4', 'DR3', 'DR2', 'DR1', 'DR0'],
    DR6: ['DR6', 'DR5', 'DR4', 'DR3', 'DR2', 'DR1'],
    DR7: ['DR7', 'DR6', 'DR5', 'DR4', 'DR3', 'DR2'],
  };

  this.RX1DROFFSET433 = 4;

  this.DR915UP = {
    SF10BW125: 'DR0',
    SF9BW125: 'DR1',
    SF8BW125: 'DR2',
    SF7BW125: 'DR3',
    SF8BW500: 'DR4',
  };

  this.DR915DOWN = {
    SF12BW500: 'DR8',
    SF11BW500: 'DR9',
    SF10BW500: 'DR10',
    SF9BW500: 'DR11',
    SF8BW500: 'DR12',
    SF7BW500: 'DR13',
  };

  this.RX1DROFFSET915TABLE = {
    DR0: ['DR10', 'DR9', 'DR8', 'DR8'],
    DR1: ['DR11', 'DR10', 'DR9', 'DR8'],
    DR2: ['DR12', 'DR11', 'DR10', 'DR9'],
    DR3: ['DR13', 'DR12', 'DR11', 'DR10'],
    DR4: ['DR13', 'DR13', 'DR12', 'DR11'],
    DR8: ['DR8', 'DR8', 'DR8', 'DR8'],
    DR9: ['DR9', 'DR8', 'DR8', 'DR8'],
    DR10: ['DR10', 'DR9', 'DR8', 'DR8'],
    DR11: ['DR11', 'DR10', 'DR9', 'DR8'],
    DR12: ['DR12', 'DR11', 'DR10', 'DR9'],
    DR13: ['DR13', 'DR12', 'DR11', 'DR10'],
  };

  this.RX1DROFFSET915 = 1;

  this.DR_PARAM = {
    RX1DROFFSETTABLE: [this.RX1DROFFSET433TABLE, this.RX1DROFFSET915TABLE],
    DRUP: [this.DR433, this.DR915UP],
    DRDOWN: [this.DR433, this.DR915DOWN],
    RX1DROFFSET: [this.RX1DROFFSET433, this.RX1DROFFSET915], // FIXME delete me, DeviceConfig
  };

  // Default configuration of txpk
  this.TXPK_CONFIG = {
    TMST_OFFSET: 1000000,
    TMST_OFFSET_JOIN: 5000000,
    FREQ: [
      FREQ => FREQ,
      CHAN => 923.3 + (CHAN % 8) * 0.6,
      FREQ => FREQ,
      FREQ => FREQ,
    ],
    POWE: [25, 20, 20, 20],
  };

  this.RXDELAY_LEN = 1;
  this.DEFAULT_RXDELAY = Buffer.alloc(this.RXDELAY_LEN);

  //Constants for PHY payload parsing
  this.MHDR_OFFSET = 0;
  this.MHDR_LEN = 1;
  this.MACPAYLOAD_OFFSET = this.MHDR_OFFSET + this.MHDR_LEN;
  this.MHDR_END = this.MACPAYLOAD_OFFSET;

  //MHDR parsing
  this.MTYPE_OFFSET = 5;
  this.MTYPE_LEN = 3;
  this.MAJOR_OFFSET = 0;
  this.MAJOR_LEN = 2;
  this.MAJOR_DEFAULT = 0;

  this.MIC_LEN = 4;

  this.JOIN_REQ = 0;
  this.JOIN_ACCEPT = 1;
  this.UNCONFIRMED_DATA_UP = 2;
  this.UNCONFIRMED_DATA_DOWN = 3;
  this.CONFIRMED_DATA_UP = 4;
  this.CONFIRMED_DATA_DOWN = 5;
  this.REJOIN_REQ = 6;

  //Data message type list
  this.NS_MSG_TYPE_LIST = [
    this.UNCONFIRMED_DATA_UP,
    this.CONFIRMED_DATA_UP,
  ];

  //Join message type list
  this.JS_MSG_TYPE = {
    'request': this.JOIN_REQ,
    'accept': this.JOIN_ACCEPT,
    'rejoin': this.REJOIN_REQ,
  };

  // this.JS_MSG_TYPE_LIST = Object.values(this.JS_MSG_TYPE);
  this.JS_MSG_TYPE_LIST = [
    this.JOIN_REQ,
  ];

  //UDP message version
  this.UDP_VERSION_LIST = [
    0x01,
    0x02,
  ];

  //UDP payload offset and length, prefix = UDP
  this.UDP_VERSION_LEN = 1;
  this.UDP_VERSION_OFFSET = 0;
  this.UDP_TOKEN_LEN = 2;
  this.UDP_TOKEN_OFFSET = this.UDP_VERSION_OFFSET + this.UDP_VERSION_LEN;
  this.UDP_IDENTIFIER_LEN = 1;
  this.UDP_IDENTIFIER_OFFSET = this.UDP_TOKEN_OFFSET + this.UDP_TOKEN_LEN;
  this.PULL_DATA_LENGTH = this.UDP_IDENTIFIER_LEN + this.UDP_VERSION_LEN + this.UDP_TOKEN_LEN + this.GATEWAYID_LEN;
  this.PUSH_DATA_BASIC_LENGTH = this.PULL_DATA_LENGTH;
  this.UDP_DATA_BASIC_LENGTH = this.PULL_DATA_LENGTH;

  //UDP identifier
  this.UDP_ID_PUSH_DATA = 0x00;
  this.UDP_ID_PUSH_ACK = 0x01;
  this.UDP_ID_PULL_DATA = 0x02;
  this.UDP_ID_PULL_RESP = 0x03;
  this.UDP_ID_PULL_ACK = 0x04;
  this.UDP_ID_TX_ACK = 0x05;
  //UDP identifier string
  this.UDP_IDENTIFIER = {
    [this.UDP_ID_PUSH_DATA]: 'PUSH_DATA',
    [this.UDP_ID_PUSH_ACK]: 'PUSH_ACK',
    [this.UDP_ID_PULL_DATA]: 'PULL_DATA',
    [this.UDP_ID_PULL_RESP]: 'PULL_RESP',
    [this.UDP_ID_PULL_ACK]: 'PULL_ACK',
    [this.UDP_ID_TX_ACK]: 'TX_ACK',
  };

  //UDP PUSH_DATA
  this.UDP_GW_ID_OFFSET = this.UDP_IDENTIFIER_OFFSET + this.UDP_IDENTIFIER_LEN;
  this.UDP_JSON_OBJ_OFFSET = this.UDP_GW_ID_OFFSET + this.GATEWAYID_LEN;

  this.UDP_DOWNLINK_BASIC_LEN = this.UDP_VERSION_LEN + this.UDP_TOKEN_LEN + this.UDP_IDENTIFIER_LEN;

  //UDP PUSH_ACK
  this.UDP_PUSH_ACK_LEN = this.UDP_DOWNLINK_BASIC_LEN;
  //UDP PULL_DATA same as PUSH_DATA

  //UDP PULL_ACK
  this.UDP_PULL_ACK_LEN = this.UDP_DOWNLINK_BASIC_LEN + this.GATEWAYID_LEN;

  //UDP PULL_RESP
  this.UDP_PULL_RESP_PAYLOAD_OFFSET = this.UDP_GW_ID_OFFSET;
  this.UDP_PULL_RESP_PAYLOAD_BASIC_LEN = this.UDP_DOWNLINK_BASIC_LEN;

  //UDP TX_ACK same as PULL_RESP
  this.UDP_TX_ACK_PAYLOAD_OFFSET = this.UDP_JSON_OBJ_OFFSET;

  this.UDP_PACKAGE_ENCODING = 'ascii';
  this.DATA_ENCODING = 'base64';

  //MAC payload offset, prefix = MP
  this.MP_DEVADDR_OFFSET = 0;
  this.MP_FHDR_OFFSET = 0;
  this.MP_FCTRL_OFFSET = this.MP_DEVADDR_OFFSET + this.DEVADDR_LEN;
  this.MP_DEVADDR_END = this.MP_FCTRL_OFFSET;
  this.FCTRL_LEN = 1;
  this.MP_FCNT_OFFSET = this.MP_FCTRL_OFFSET + this.FCTRL_LEN;
  this.MP_FCTRL_END = this.MP_FCNT_OFFSET;
  this.FCNT_LEN = 4;
  this.MP_FCNT_LEN = 2;
  this.FCNT_LEAST_OFFSET = 2;
  this.FHDR_LEN_BASE = this.DEVADDR_LEN + this.FCTRL_LEN + this.MP_FCNT_LEN;
  this.MP_FOPTS_OFFSET = this.MP_FCNT_OFFSET + this.MP_FCNT_LEN;
  this.MP_FCNT_END = this.MP_FOPTS_OFFSET;
  this.FOPTS_MAXLEN = 15;
  //FCTRL bitwise offset, prefix = FC, bit length
  this.FC_FOPTSLEN_OFFSET = 0;
  this.FOPTSLEN = 4;
  this.FC_FPENDING_OFFSET = this.FC_FOPTSLEN_OFFSET + this.FOPTSLEN;
  this.FPENDING_LEN = 1;
  this.FC_ACK_OFFSET = this.FC_FPENDING_OFFSET + this.FPENDING_LEN;
  this.FC_CLASSB_OFFSET = this.FC_ACK_OFFSET + this.ACK_LEN;
  this.CLASSB_LEN = 1;
  this.ACK_LEN = 1;
  this.RFU_LEN = 1;
  this.FC_ADR_OFFSET = this.FC_ACK_OFFSET + this.ACK_LEN + this.RFU_LEN;
  this.ADR_LEN = 1;
  this.FC_ADRACKREQ_OFFSET = this.FC_ACK_OFFSET + this.ACK_LEN;
  this.ADRACKREQ_LEN = 1;

  this.FPORT_LEN = 1;

  this.MIN_MACPAYLOAD_LEN = this.FHDR_LEN_BASE;
  this.MIN_PHYPAYLOAD_LEN = this.MHDR_LEN + this.MIN_MACPAYLOAD_LEN + this.MIC_LEN;

  //For join request
  this.JOINEUI_OFFSET = 0;
  this.JOINEUI_LEN = 8;
  this.DEVEUI_OFFSET = this.JOINEUI_OFFSET + this.JOINEUI_LEN;
  this.DEVNONCE_OFFSET = this.DEVEUI_OFFSET + this.DEVEUI_LEN;
  this.JOINREQ_BASIC_LENGTH = this.APPEUI_LEN + this.DEVEUI_LEN + this.DEVNONCE_LEN

  //MIC and encrypt block
  this.BLOCK_CLASS = {
    A: 0x01,
    B: 0x49,
  };

  this.BLOCK_DIR_CLASS = {
    Up: 0x00,
    Down: 0x01,
  };

  this.BLOCK_LEN = 16;
  this.BLOCK_DIR_OFFSET = 5;
  this.BLOCK_DIR_LEN = 1;
  this.BLOCK_DEVADDR_OFFSET = this.BLOCK_DIR_OFFSET + this.BLOCK_DIR_LEN;
  this.BLOCK_FCNT_OFFSET = this.BLOCK_DEVADDR_OFFSET + this.DEVADDR_LEN;
  this.BLOCK_LENMSG_OFFSET = this.BLOCK_FCNT_OFFSET + this.FCNT_LEN + 1;
  this.IV_LEN = this.BLOCK_LEN;

  this.BLOCK_LEN_REQ_MIC = this.MHDR_LEN + this.APPEUI_LEN + this.DEVEUI_LEN + this.DEVNONCE_LEN;

  this.BLOCK_LEN_ACPT_BASE = this.APPNONCE_LEN + this.NETID_LEN + this.DEVADDR_LEN + this.DLSETTINGS_LEN + this.RXDELAY_LEN;
  this.BLOCK_LEN_ACPT_MIC_BASE = this.MHDR_LEN + this.BLOCK_LEN_ACPT_BASE;

  this.LENMSG_LEN = 1;

  this.V102_CMAC_LEN = 4;
  this.V11_CMAC_LEN = 2;

  //ants for XCloud
  this.DID_LEN = 22;
  this.PK_LEN = 32; //Product key
  this.SESSKEYBUF_LEN = 1 + this.APPNONCE_LEN + this.DEVNONCE_LEN + this.NETID_LEN;
  this.SK_APPNONCE_OFFSET = 1;
  this.SK_NETID_OFFSET = this.SK_APPNONCE_OFFSET + this.APPNONCE_LEN;
  this.SK_DEVNONCE_OFFSET = this.SK_NETID_OFFSET + this.NETID_LEN;

  //Default RxDelay for RX1 is 1 sec.
  this.DEFAULT_RXDELAY = Buffer.alloc(this.RXDELAY_LEN);

  this.NS_SUB_TOPIC = 'NS-sub-test';
  this.NC_SUB_TOPIC = 'NC-sub-test';

  this.HASH_METHOD = 'md5';
  this.ENCRYPTION_ALGO = 'aes-128-ecb';

  this.JR_APPEUI_OFFSET = 0;

  this.MESSAGE_ID_LEN = 4;

  this.MACCMDQUEANS_PREFIX = 'lora:nc:maccommand:ans:';
  this.MACCMDQUEREQ_PREFIX = 'lora:nc:maccommand:req:';

  this.QUEUE_CMDANS_LIST = [
    0x01,
    0x02,
    0x0B,
    0x0D,
  ];

  //MACCommand
  this.CID_LEN = 1;
  this.CID_OFFEST = 0;
  this.PAYLOAD_OFFEST = 1;

  this.RESET_CID = 0x01;
  this.RESETIND_LEN = 1;
  this.RESETCONF_LEN = 1;
  this.RESETIND = {
    MINOR_START: 0,
    MINOR_LEN: 4,
  }

  this.LINKCHECK_CID = 0x02;
  this.LINKCHECKREQ_LEN = 0;
  this.LINKCHECKANS_LEN = 2;
  this.LINKCHECKANS = {
    MARGIN_LEN: 1,
    GWCNT_LEN: 1,
  };

  this.LINKADR_CID = 0x03;
  this.LINKADRANS_LEN = 1;
  this.LINKADRREQ_LEN = 4;
  this.LINKADRREQ = {
    DATARATE_TXPOWER_LEN: 1,
    CHMASK_LEN: 2,
    REDUNDANCY_LEN: 1,
    DATARATE_BASE: 16,
    TXPOWER_BASE: 1, // DataRate_TXPower = DataRate * DATARATE_BASE + TXPower * TXPOWER_BASE
    CHMASKCNTL_BASE: 16,
    NBTRANS_BASE: 1, // Redundancy = ChMaskCntl * CHMASKCNTL_BASE + NbTrans * NBTRANS_BASE
    DATARATE_DEFAULT: 15, // keep datarate of device unchanged
    TXPOWER_DEFAULT: 15, // keep txpower of device unchanged
    NBTRANS_DEFAULT: 0, // keep nbtrans unchanged
  };
  this.LINKADRANS = {
    CHANNELMASKACK_START: 0,
    CHANNELMASKACK_LEN: 1,
    DATARATEACK_START: 1,
    DATARATEACK_LEN: 1,
    POWERACK_START: 2,
    POWERACK_LEN: 1,
  }

  this.DUTYCYCLE_CID = 0x04;
  this.DUTYCYCLEANS_LEN = 0;
  this.DUTYCYCLEREQ_LEN = 1;
  this.DUTYCYCLEREQ = {
    MAXCYCLE_BASE: 1,
    DUTYCYCLEPL_LEN: 1,
  }

  this.RXPARAMSETUP_CID = 0x05;
  this.RXPARAMSETUPANS_LEN = 1;
  this.RXPARAMSETUPREQ_LEN = 4;
  this.RXPARAMSETUPREQ = {
    FREQUENCY_LEN: 3,
    DLSETTINGS_LEN: 1,
    RX2DATARATE_BASE: 1,
    RX1DROFFSET_BASE: 16, // DLSettings = RX1DRoffset * RX1DROFFSET_BASE + RX2DataRate * RX2DATARATE_BASE
  }
  this.RXPARAMSETUPANS = {
    CHANNELACK_START: 0,
    CHANNELACK_LEN: 1,
    RX2DATARATEACK_START: 1,
    RX2DATARATEACK_LEN: 1,
    RX1DROFFSETACK_START: 2,
    RX1DROFFSETACK_LEN: 1,
  }

  this.DEVSTATUS_CID = 0x06;
  this.DEVSTATUSANS_LEN = 2;
  this.BATTERY_LEN = 1;
  this.DEVSTATUSREQ_LEN = 0;
  this.DEVSTATUSANS = {
    BATTERY_START: 0,
    BATTERY_LEN: 1,
    MARGIN_START: 1,
    MARGIN_LEN: 1,
  }

  this.NEWCHANNEL_CID = 0x07;
  this.NEWCHANNELANS_LEN = 1;
  this.NEWCHANNELREQ_LEN = 5;
  this.NEWCHANNELREQ = {
    CHINDEX_LEN: 1,
    FREQ_LEN: 3,
    DRRANGE_LEN: 1,
    MAXDR_BASE: 16,
    MINDR_BASE: 1, // DrRange = MaxDR * MAXDR_BASE + MinDR * MINDR_BASE
  }
  this.NEWCHANNELANS = {
    CHANNELFREQUENCY_START: 0,
    CHANNEKFREQUENCY_LEN: 1,
    DATARATERANGE_START: 1,
    DATARATERANGE_LEN: 1,
  }

  this.RXTIMINGSETUP_CID = 0x08;
  this.RXTIMINGSETUPANS_LEN = 0;
  this.RXTIMINGSETUPREQ_LEN = 1;
  this.RXTIMINGSETUPREQ = {
    SETTINGS_LEN: 1,
  }

  this.TXPARAMSETUP_CID = 0x09;
  this.TXPARAMSETUPANS_LEN = 0;
  this.TXPARAMSETUPREQ_LEN = 1;
  this.TXPARAMSETUPREQ = {
    EIRP_DWELLTIME_LEN: 1,
    DOWNLINKDWELLTIME_BASE: 32,
    UPLINKDWELLTIME_BASE: 16,
    MAXEIRP_BASE: 1 // EIRP_DwellTime = DownlinkDwellTime * DOWNLINKDWELLTIME_BASE + UplinkDwellTime * UPLINKDWELLTIME_BASE + MaxEIRP * MAXEIRP_BASE
  }

  this.DLCHANNEL_CID = 0x0A;
  this.DLCHANNELANS_LEN = 1;
  this.DLCHANNELREQ_LEN = 4;
  this.DLCHANNELREQ = {
    CHINDEX_LEN: 1,
    FREQ_LEN: 3,
  }
  this.DLCHANNELANS = {
    CHANNELFREQUENCY_START: 0,
    CHANNELFREQUENCY_LEN: 1,
    UPLINKFREQUENCY_START: 1,
    UPLINKFREQUENCY_LEN: 1,
  }

  this.REKEY_CID = 0x0B;
  this.REKEYIND_LEN = 1;
  this.REKEYCONF_LEN = 1;
  this.REKEYIND = {
    MINOR_START: 0,
    MINOR_LEN: 4,
  }

  this.ADRPARAMSETUP_CID = 0x0C;
  this.ADRPARAMSETUPANS_LEN = 0;
  this.ADRPARAMSETUPREQ_LEN = 1;
  this.ADRPARAMSETUPREQ = {
    ADRPARAM_LEN: 1,
    LIMIT_EXP_BASE: 16,
    DELAY_EXP_BASE: 1, // ADRparam = Limit_exp * LIMIT_EXP_BASE + Delay_exp * DELAY_EXP_BASE
  }

  this.DEVICETIME_CID = 0x0D;
  this.DEVICETIMEREQ_LEN = 0;
  this.DEVICETIMEANS_LEN = 5;
  this.DEVICETIMEANS = {
    FRACTIONALSEC_LEN: 1,
    SECONDS_LEN: 4,
  }

  this.FORCEREJOIN_CID = 0x0E;
  this.FORCEREJOINREQ_LEN = 2;
  this.FORCEREJOINREQ = {
    PERIOD_BASE: 1024,
    MAX_RETRIES_BASE: 256,
    REJOINTYPE_BASE: 16,
    DR_BASE: 1 // ForcerRejoinReq = Period * PERIOD_BASE + Max_Retries * MAX_RETRIES_BASE + RejoinType * REJOINTYPE_BASE + DR * DR_BASE
  }

  this.REJOINPARAMSETUP_CID = 0x0F;
  this.REJOINPARAMSETUPANS_LEN = 1;
  this.REJOINPARAMSETUPREQ_LEN = 1;
  this.REJOINPARAMSETUPREQ = {
    MAXTIMEN_BASE: 16,
    MAXCOUNTN_BASE: 1, // RejoinParamSetupReq = MaxTimeN * MAXTIMEN_BASE + MacCountN * MAXCOUNTN_BASE
  }
  this.REJOINPARAMSETUPANS = {
    TIMEOK_START: 0,
    TIMEOK_LEN: 1,
  }

  this.MACCMD_DOWNLINK_LIST = {
    [this.RESET_CID]: this.RESETCONF_LEN,
    [this.LINKCHECK_CID]: this.LINKCHECKANS_LEN,
    [this.LINKADR_CID]: this.LINKADRREQ_LEN,
    [this.DUTYCYCLE_CID]: this.DUTYCYCLEREQ_LEN,
    [this.RXPARAMSETUP_CID]: this.RXPARAMSETUPREQ_LEN,
    [this.DEVSTATUS_CID]: this.DEVSTATUSREQ_LEN,
    [this.NEWCHANNEL_CID]: this.NEWCHANNELREQ_LEN,
    [this.RXTIMINGSETUP_CID]: this.RXTIMINGSETUPREQ_LEN,
    [this.TXPARAMSETUP_CID]: this.TXPARAMSETUPREQ_LEN,
    [this.DLCHANNEL_CID]: this.DLCHANNELREQ_LEN,
    [this.REKEY_CID]: this.REKEYCONF_LEN,
    [this.ADRPARAMSETUP_CID]: this.ADRPARAMSETUPREQ_LEN,
    [this.DEVICETIME_CID]: this.DEVICETIMEANS_LEN,
    [this.FORCEREJOIN_CID]: this.FORCEREJOINREQ_LEN,
    [this.REJOINPARAMSETUP_CID]: this.REJOINPARAMSETUPREQ_LEN,
  };

  this.MACCMD_UPLINK_LIST = {
    [this.RESET_CID]: this.RESETIND_LEN,
    [this.LINKCHECK_CID]: this.LINKCHECKREQ_LEN,
    [this.LINKADR_CID]: this.LINKADRANS_LEN,
    [this.DUTYCYCLE_CID]: this.DUTYCYCLEANS_LEN,
    [this.RXPARAMSETUP_CID]: this.RXPARAMSETUPANS_LEN,
    [this.DEVSTATUS_CID]: this.DEVSTATUSANS_LEN,
    [this.NEWCHANNEL_CID]: this.NEWCHANNELANS_LEN,
    [this.RXTIMINGSETUP_CID]: this.RXTIMINGSETUPANS_LEN,
    [this.TXPARAMSETUP_CID]: this.TXPARAMSETUPANS_LEN,
    [this.DLCHANNEL_CID]: this.DLCHANNELANS_LEN,
    [this.REKEY_CID]: this.REKEYIND_LEN,
    [this.ADRPARAMSETUP_CID]: this.ADRPARAMSETUPANS_LEN,
    [this.DEVICETIME_CID]: this.DEVICETIMEREQ_LEN,
    [this.REJOINPARAMSETUP_CID]: this.REJOINPARAMSETUPANS_LEN,
  };

  // Required Demodulator SNR (/dB) of LoRa modem
  this.SF_REQUIREDSNR = {
    ['12']: -20,
    ['11']: -17.5,
    ['10']: -15,
    ['9']: -12.5,
    ['8']: -10,
    ['7']: -7.5,
    ['6']: -5
  }

  this.ADR_CONTROLSCHEME_PARAM = {
    LATEST_SNR_NO: 20,
    DEVICEMARGIN: 10,
    STEPS_DIVISOR: 3,
    SF_STEP: 1,
    TXPOWER_STEP: 1,
    CHMASK_DEFAULT: '00FF',
    CHMASKCNTL_DEFAULT: {
      [this.FREQUENCY_PLAN_LIST[0]]: 6,
      [this.FREQUENCY_PLAN_LIST[1]]: 5,
      [this.FREQUENCY_PLAN_LIST[2]]: 6,
      [this.FREQUENCY_PLAN_LIST[3]]: 6,
    },
    NBTRANS_DEFAULT: this.LINKADRREQ.NBTRANS_DEFAULT,
  }

  this.MAX_FRMPAYLOAD_SIZE_REPEATER = {
    433: {
      SF12BW125: 51,
      SF11BW125: 51,
      SF10BW125: 51,
      SF9BW125: 115,
      SF8BW125: 222,
      SF7BW125: 222,
      SF7BW250: 222,
    },
    915: {
      SF12BW125: 51,
      SF11BW125: 51,
      SF10BW125: 51,
      SF9BW125: 115,
      SF8BW125: 222,
      SF7BW125: 222,
      SF8BW500: 222,

      SF12BW500: 33,
      SF11BW500: 109,
      SF10BW500: 222,
      SF9BW500: 222,
      SF8BW500: 222,
      SF7BW500: 222,
    },
  }
  this.MAX_FRMPAYLOAD_SIZE_NOREPEATER = {
    433: {
      SF12BW125: 51,
      SF11BW125: 51,
      SF10BW125: 51,
      SF9BW125: 115,
      SF8BW125: 242,
      SF7BW125: 242,
      SF7BW250: 242,
    },
    915: {
      SF12BW125: 51,
      SF11BW125: 51,
      SF10BW125: 51,
      SF9BW125: 115,
      SF8BW125: 242,
      SF7BW125: 242,
      SF8BW500: 242,

      SF12BW500: 53,
      SF11BW500: 129,
      SF10BW500: 242,
      SF9BW500: 242,
      SF8BW500: 242,
      SF7BW500: 242,
    },
  }
  this.TXPOWER_MAX_LIST = {
    [this.FREQUENCY_PLAN_LIST[0]]: 5,
    [this.FREQUENCY_PLAN_LIST[1]]: 10,
    [this.FREQUENCY_PLAN_LIST[2]]: 7,
    [this.FREQUENCY_PLAN_LIST[3]]: 5,
  };

  this.TXPOWER_MIN = 0;

  this.SPREADFACTOR_MIN = 7;

  this.MONGO_USERCOLLECTION_PREFIX = "lora_user_";
  this.MONGO_JOINMSGCOLLECTION = "lora_join";
  this.MONGO_APPMSGCOLLECTION_PREFIX = "lora_appeui_";
  this.MONGO_SAVEDMSG_TYPE = {
    uplink_joinReq: 'UPLINK_JOINREQ',
    uplink_msg: 'UPLINK_MSG',
    uplink_gatewayStat: 'GATEWAYSTAT',
    downlink_joinAns: 'DONWLINK_JOINANS',
    downlink_msg: 'DOWNLINK_MSG',
  }

  //Cache attributes
  this.DEVICEINFO_CACHE_ATTRIBUTES = [
    'AppEUI',
    'NwkSKey',
    'AppSKey',
    'FCntUp',
    'NFCntDown',
    'AFCntDown',
    'ProtocolVersion'
  ];
  this.DEVICECONFIG_CACHE_ATTRIBUTES = [
    'frequencyPlan',
    'ADR',
    'RX1DRoffset',
    'RX1Delay'
  ];
  this.DEVICEROUTING_CACHE_ATTRIBUTES = [
    'gatewayId',
    'imme',
    'tmst',
    'freq',
    'rfch',
    'powe',
    'datr',
    'modu',
    'codr',
    'ipol'
  ];
};
