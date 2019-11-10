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
      defaultValue: '',//有问题
    },
    AppEUI: {
      type: Sequelize.CHAR(consts.APPEUI_LEN * 2),
      allowNull: false,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    DevNonce: {
      type: Sequelize.CHAR(consts.DEVNONCE_LEN * 2),
      allowNull: true,
    },
    AppNonce: {
      type: Sequelize.CHAR(consts.APPNONCE_LEN * 2),
      allowNull: true,
    },
    NwkSKey: {
      type: Sequelize.CHAR(consts.NWKSKEY_LEN * 2),
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
    description: {
      type: Sequelize.STRING,
      allowNull: true,
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
