const Validator = require('validatorjs');
var common = new Object();
common.necessary = 'required'; /**basic */
common.normal = 'string';
common.userID = 'required|size:32|hex'; /**common.application.append */
common.AppEUI = 'required|size:16|hex';
common.name = 'required|between:1,32';
common.description = 'between:1,128';
common.protoBuf = 'required|between:1,1024';
common.message = 'required|between:1,1024';
common.DevEUI = 'required|size:16|hex'; /**common.deviceInfo.append */
common.AppKey = 'required|size:32|hex';
common.ProtocolVersion = 'required|between:1,16';
common.DevAddr = 'required|size:8|hex';
common.AppSKey = 'required|size:32|hex';
common.NwkSKey = 'required|size:32|hex';
common.DevNonce = 'required|size:4';
common.frequencyPlan = 'required|between:1,11';
common.gatewayId = 'required|size:16|hex'; /**common.gatewayInfo.append */
common.email = 'required|email';
common.password = 'required|between:6,32';
/**application */
var us = new Object();
us.email = common.email;
us.password = common.password;
var ap = new Object();
ap.userID = common.userID;
ap.AppEUI = common.AppEUI;
ap.name = common.name;
ap.description = common.description;
ap.protoBuf = common.protoBuf;
ap.message = common.message;
/**device */
var dv = new Object();
dv.userID = common.userID;
dv.AppEUI = common.AppEUI;
dv.name = common.name;
dv.description = common.description;
dv.DevEUI = common.DevEUI;
dv.AppKey = common.AppKey;
dv.ProtocolVersion = common.ProtocolVersion;
dv.DevAddr = common.DevAddr;
dv.AppSKey = common.AppSKey;
dv.NwkSKey = common.NwkSKey;
dv.DevNonce = common.DevNonce;
dv.frequencyPlan = common.frequencyPlan;
dv.activationMode = common.necessary;
dv.ADR = common.necessary;
dv.ChMask = common.necessary;
dv.CFList = common.necessary;
dv.ChDrRange = common.necessary;
dv.RX1CFList = common.necessary;
dv.RX2Freq = common.necessary;
dv.RX2DataRate = common.necessary;
dv.MaxEIRP = common.necessary;
/**gatewayInfo */
var gi = new Object();
gi.gatewayId = common.gatewayId;
gi.userID = common.userID;
gi.name = common.normal;
gi.frequencyPlan = common.normal;
gi.location = common.normal;
gi.RFChain = common.normal;
gi.type = common.normal;
gi.model = common.normal;
gi.description = common.normal;

const ruleTables = {
  user: {
    login: {
      email: us.email,
      password: us.password,
    },
    register: {
      email: us.email,
      password: us.password,
    },
  },
  application: {
    postApplication: {
      userID: ap.userID,
      AppEUI: ap.AppEUI,
      name: ap.name,
      description: ap.description,
    },
    protoBuf: {
      userID: ap.userID,
      name: ap.name,
      protoBuf: ap.protoBuf,
    },
    app2devType: {
      AppEUI: ap.AppEUI,
      message: ap.message,
    },
  },
  device: {
    postDeviceOTAA: {
      AppEUI: dv.AppEUI,
      DevEUI: dv.DevEUI,
      AppKey: dv.AppKey,
      name: dv.name,
      ProtocolVersion: dv.ProtocolVersion,
      activationMode: dv.activationMode,
      description: dv.description,
    },
    postDeviceABP: {
      AppEUI: dv.AppEUI,
      DevEUI: dv.DevEUI,
      DevAddr: dv.DevAddr,
      name: dv.name,
      AppSKey: dv.AppSKey,
      NwkSKey: dv.NwkSKey,
      ProtocolVersion: dv.ProtocolVersion,
      activationMode: dv.activationMode,
      DevNonce: dv.DevNonce,
      frequencyPlan: dv.frequencyPlan,
      ADR: dv.ADR,
      ChMask: dv.ChMask,
      CFList: dv.CFList,
      ChDrRange: dv.ChDrRange,
      RX1CFList: dv.RX1CFList,
      RX2Freq: dv.RX2Freq,
      RX2DataRate: dv.RX2DataRate,
      MaxEIRP: dv.MaxEIRP,
      description: dv.description,
    },
  },
  gatewayInfo: {
    postGatewayInfo: {
      userID: gi.userID,
      gatewayId: gi.gatewayId,
      name: gi.name,
      type: gi.type,
      frequencyPlan: gi.frequencyPlan,
      location: gi.location,
      model: gi.model,
      description: gi.description,
    },
    byUserID: {
      userID: gi.userID,
    },
    byGatewayId: {
      gatewayId: gi.gatewayId,
    },
  },
}


function CusValidator(ruleTable) {
  this.rules = ruleTables[ruleTable];
}

CusValidator.prototype.validate = function(query, ruleName) {
  let validation = new Validator(query, this.rules[ruleName]);
  let result = validation.passes();
  if (result) {
    return {
      result
    };
  } else {
    let errors = validation.errors.errors
    let param, type, message;
    /**只返回第一个错 */
    err = Object.keys(errors)[0];
    console.log(err);
    param = err;
    message = errors[err];
    if (/required/.test(errors[err])) {
      type = 'required';
    } else {
      type = 'invalid';
    }
    return {
      result,
      param,
      type,
      message
    };
  }
}

module.exports = CusValidator;
