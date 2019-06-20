'use strict';
const {consts} = require('./modules');
const Sequelize = require('sequelize');
const Crud = require('./Crud');

const deviceInfoDef = function (sequelize) {
  return sequelize.define('DeviceInfo', {
    DevEUI: {
      type: Sequelize.CHAR(consts.DEVEUI_LEN * 2),
      primaryKey: true,
    },
    DevAddr: {
      type: Sequelize.CHAR(consts.DEVADDR_LEN * 2),
      allowNull: true,
      unique: true,
    },
    AppKey: {
      type: Sequelize.CHAR(consts.APPKEY_LEN * 2),
      allowNull: true,
    },
    NwkKey: {
      type: Sequelize.CHAR(consts.NWKKEY_LEN * 2),
      allowNull: true,
    },
    JoinEUI: {
      type: Sequelize.CHAR(consts.JOINEUI_LEN * 2),
      allowNull: false,
    },
    AppEUI: {
      type: Sequelize.CHAR(consts.APPEUI_LEN * 2),
      allowNull: true,
    },
    DevNonce: {
      type: Sequelize.CHAR(consts.DEVNONCE_LEN * 2),
      allowNull: true,
    },
    RJcount0: {
      type: Sequelize.CHAR(consts.RJCOUNT0_LEN * 2),
      allowNull: true,
    },
    RJcount1: {
      type: Sequelize.CHAR(consts.RJCOUNT0_LEN * 2),
      allowNull: true,
    },
    JoinNonce: {
      type: Sequelize.CHAR(consts.JOINNONCE_LEN * 2),
      allowNull: true,
    },
    AppNonce: {
      type: Sequelize.CHAR(consts.APPNONCE_LEN * 2),
      allowNull: true,
    },
    JoinReqType: {
      type: Sequelize.CHAR(2),
      allowNull: true,
    },
    JSIntKey:{
      type: Sequelize.CHAR(consts.JSINTKEY_LEN * 2),
      allowNull: true,
    },
    JSEncKey:{
      type: Sequelize.CHAR(consts.JSENCKEY_LEN * 2),
      allowNull: true,
    },
    SNwkSIntKey: {
      type: Sequelize.CHAR(consts.SNWKSINTKEY_LEN * 2),
      allowNull: true,
    },
    FNwkSIntKey: {
      type: Sequelize.CHAR(consts.FNWKSINTKEY_LEN * 2),
      allowNull: true,
    },
    NwkSEncKey: {
      type: Sequelize.CHAR(consts.NWKSENCKEY_LEN * 2),
      allowNull: true,
    },
    AppSKey: {
      type: Sequelize.CHAR(consts.APPSKEY_LEN * 2),
      allowNull: true,
    },
    activationMode: {
      type: Sequelize.ENUM('ABP', 'OTAA'),
      defaultValue: 'OTAA',
      allowNull: false,
    },
    ProtocolVersion: {
      type: Sequelize.STRING,
      defaultValue: '1.0.2',
      allowNull: false,
    },
    FCntUp: {
      type: Sequelize.INTEGER,
      defaultValue: 0,
      allowNull: false,
    },
    NFCntDown: {
      type: Sequelize.INTEGER,
      defaultValue: 0,
      allowNull: false,
    },
    AFCntDown: {
      type: Sequelize.INTEGER,
      defaultValue: 0,
      allowNull: false,
    },
  });
};

function DeviceInfo(sequelize) {
  this._model = deviceInfoDef(sequelize);
}

DeviceInfo.prototype = Object.create(Crud);
DeviceInfo.prototype.constructor = DeviceInfo;

function getIncrement(increaseItem) {
  return function (devaddr) {
    let increaseObj = {};
    increaseObj[increaseItem] = 1;
    return this.increaseItem({ DevAddr: devaddr }, increaseObj);
  };
}

DeviceInfo.prototype.increaseFcntup = function (devAddr, FCntUp) {
  let _this = this;
  return _this.updateItem({ DevAddr: devAddr }, { FCntUp: FCntUp });
};

DeviceInfo.prototype.increaseAfcntdown = getIncrement('AFCntDown');
DeviceInfo.prototype.increaseNfcntdown = getIncrement('NFCntDown');

module.exports = DeviceInfo;
