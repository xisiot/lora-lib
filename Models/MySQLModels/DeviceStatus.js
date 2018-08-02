'use strict';
const {consts} = require('./modules');
const Sequelize = require('sequelize');
const Crud = require('./Crud');

const deviceStatusDef = function (sequelize) {
  return sequelize.define('DeviceStatus', {
    DevAddr: {
      type: Sequelize.CHAR(consts.DEVADDR_LEN * 2),
      allowNull: false,
    },
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    gatewayId: {
      type: Sequelize.CHAR(consts.GATEWAYID_LEN * 2),
      allowNull: false,
    },
    time: {
      type: Sequelize.DATE,
    },
    tmst: {
      type: Sequelize.INTEGER.UNSIGNED,
    },
    freq: {
      type: Sequelize.FLOAT.UNSIGNED,
    },
    chan: {
      type: Sequelize.INTEGER.UNSIGNED,
    },
    rfch: {
      type: Sequelize.INTEGER.UNSIGNED,
    },
    stat: {
      type: Sequelize.INTEGER,
    },
    modu: {
      type: Sequelize.STRING,
    },
    datr: {
      type: Sequelize.STRING,
    },
    codr: {
      type: Sequelize.STRING,
    },
    rssi: {
      type: Sequelize.INTEGER,
    },
    lsnr: {
      type: Sequelize.FLOAT,
    },
    size: {
      type: Sequelize.INTEGER.UNSIGNED,
    },
  });
};

function DeviceStatus(sequelize) {
  this._model = deviceStatusDef(sequelize);
}

DeviceStatus.prototype = Object.create(Crud);
DeviceStatus.prototype.constructor = DeviceStatus;

module.exports = DeviceStatus;
