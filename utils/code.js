const code = {
  invParam: {
    email: {
      code: 2101,
      message: 'invalid email',
    },
    password: {
      code: 2102,
      message: 'invalid password',
    },
    AppEUI: {
      code: 2103,
      message: 'invalid AppEUI',
    },
    DevEUI: {
      code: 2104,
      message: 'invalid DevEUI',
    },
    AppKey: {
      code: 2105,
      message: 'invalid AppKey',
    },
    gatewayId: {
      code: 2106,
      message: 'invalid gatewayId',
    },
    DevAddr: {
      code: 2107,
      message: 'invalid DevAddr',
    },
    MACCommand: {
      code: 2108,
      message: 'invalid MACCommand',
    },
    Downlink: {
      code: 2109,
      message: 'invalid Downlink',
    },
    userID: {
      code: 2111,
      message: 'invalid userID',
    },
    name: {
      code: 2112,
      message: 'invalid name',
    },
    protoBuf: {
      code: 2113,
      message: 'invalid protoBuf',
    },
    ProtocolVersion: {
      code: 2114,
      message: 'invalid ProtocolVersion',
    },
    activationMode: {
      code: 2115,
      message: 'invalid activationMode',
    },
    description: {
      code: 2116,
      message: 'invalid description',
    },
    AppSKey: {
      code: 2117,
      message: 'invalid AppSKey',
    },
    NwkSKey: {
      code: 2118,
      message: 'invalid NwkSKey',
    },
    DevNonce: {
      code: 2119,
      message: 'invalid DevNonce',
    },
    frequencyPlan: {
      code: 2120,
      message: 'invalid frequencyPlan',
    },
    ADR: {
      code: 2121,
      message: 'invalid ADR',
    },
    ChMask: {
      code: 2122,
      message: 'invalid ChMask',
    },
    CFList: {
      code: 2123,
      message: 'invalid CFList',
    },
    ChDrRange: {
      code: 2124,
      message: 'invalid ChDrRange',
    },
    RX1CFList: {
      code: 2125,
      message: 'invalid RX1CFList',
    },
    RX2Freq: {
      code: 2126,
      message: 'invalid RX2Freq',
    },
    RX2DataRate: {
      code: 2127,
      message: 'invalid RX2DataRate',
    },
    MaxEIRP: {
      code: 2128,
      message: 'invalid MaxEIRP',
    },
    message: {
      code: 2129,
      message: 'invalid message',
    },
  },
  requiredParam: {

    userID: {
      code: 3104,
      message: 'userID required',
    },
    email: {
      code: 3105,
      message: 'email required',
    },
    password: {
      code: 3106,
      message: 'password required',
    },
    AppEUI: {
      code: 3107,
      message: 'AppEUI required',
    },
    name: {
      code: 3108,
      message: 'name required',
    },
    DevEUI: {
      code: 3109,
      message: 'DevEUI required',
    },
    AppKey: {
      code: 3110,
      message: 'AppKey required',
    },
    DevAddr: {
      code: 3112,
      message: 'DevAddr required',
    },
    MACCommand: {
      code: 3113,
      message: 'MACCommand required',
    },
    Downlink: {
      code: 3114,
      message: 'Downlink required',
    },
    activationMode: {
      code: 3115,
      message: 'activationMode required',
    },
    gatewayId: {
      code: 3116,
      message: 'gatewayId required',
    },
    protoBuf: {
      code: 3117,
      message: 'protoBuf required',
    },
    AppKey: {
      code: 3118,
      message: 'AppKey required',
    },
    ProtocolVersion: {
      code: 3119,
      message: 'ProtocolVersion required',
    },
    a: {
      code: 3120,
      message: 'a required',
    },
    description: {
      code: 3121,
      message: 'description required',
    },
    AppSKey: {
      code: 3122,
      message: 'AppSKey required',
    },
    NwkSKey: {
      code: 3123,
      message: 'NwkSKey required',
    },
    DevNonce: {
      code: 3124,
      message: 'DevNonce required',
    },
    frequencyPlan: {
      code: 3125,
      message: 'frequencyPlan required',
    },
    ADR: {
      code: 3126,
      message: 'ADR required',
    },
    ChMask: {
      code: 3127,
      message: 'ChMask required',
    },
    CFList: {
      code: 3128,
      message: 'CFList required',
    },
    ChDrRange: {
      code: 3129,
      message: 'ChDrRange required',
    },
    RX1CFList: {
      code: 3130,
      message: 'RX1CFList required',
    },
    RX2Freq: {
      code: 3131,
      message: 'RX2Freq required',
    },
    RX2DataRate: {
      code: 3132,
      message: 'RX2DataRate required',
    },
    MaxEIRP: {
      code: 3133,
      message: 'MaxEIRP required',
    },
    message: {
      code: 3134,
      message: 'message required',
    },

  },

  success: {
    code: 200,
    message: 'success',
  },
  registeredUser: {
    code: 3101,
    message: 'user already registered',
  },
  userNotRegistered: {
    code: 3102,
    message: 'user not registered',
  },
  userPasswordErr: {
    code: 3103,
    message: 'user password error',
  },
  createdApp: {
    code: 3201,
    message: 'application already created',
  },
  appNotCreated: {
    code: 3202,
    message: 'application not created'
  },
  createdName: {
    code: 3203,
    message: 'name already created',
  },
  repeatedAppEUI: {
    code: 3204,
    message: 'repeated AppEUI',
  },
  createdDev: {
    code: 3301,
    message: 'device already created',
  },
  createdGateway: {
    code: 3401,
    message: 'gateway already created',
  },
  noItem: {
    code: 4001,
    message: 'No such item',
  },
};

module.exports = code;
