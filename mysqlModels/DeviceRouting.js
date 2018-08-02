'use strict';

const BluebirdPromise = require('bluebird');
const consts = require('../constants');
const Sequelize = require('sequelize');
const Crud = require('./Crud');
const utils = require('../utils');

const deviceRoutingDef = function (sequelize) {
  return sequelize.define('DeviceRouting', {
    DevAddr: {
      type: Sequelize.CHAR(consts.DEVADDR_LEN * 2),
      primaryKey: true,
      allowNull: false,
    },
    gatewayId: {
      type: Sequelize.CHAR(consts.GATEWAYID_LEN * 2),
      allowNull: false,
    },
    imme: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
    tmst: {
      type: Sequelize.INTEGER.UNSIGNED,
    },
    freq: {
      type: Sequelize.FLOAT.UNSIGNED,
    },
    rfch: {
      type: Sequelize.INTEGER.UNSIGNED,
      defaultValue: 0,
    },
    powe: {
      type: Sequelize.INTEGER,
      defaultValue: 20,
    },
    datr: {
      type: Sequelize.STRING,
    },
    modu: {
      type: Sequelize.STRING,
      defaultValue: 'LORA',
    },
    codr: {
      type: Sequelize.STRING,
    },
    ipol: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
  });
};

function DeviceRouting(sequelize) {
  this._model = deviceRoutingDef(sequelize);
}

DeviceRouting.prototype = Object.create(Crud);
DeviceRouting.prototype.constructor = DeviceRouting;

DeviceRouting.prototype.getTxpkInfo = function (devAddr, DeviceInfo, DeviceConfig) {
  if (Buffer.isBuffer(devAddr)) {
    devAddr = devAddr.toString('hex');
  }

  let _this = this;
  return _this._model.find({
    where: {
      DevAddr: devAddr,
    },
    include: [
      {

        // model: DeviceInfo._model,
        association: _this._model.hasOne(DeviceInfo._model, { foreignKey: 'DevAddr' }),
        where: {
          DevAddr: devAddr,
        },
        attributes: ['FCntUp', 'AFCntDown', 'ProtocolVersion'],
      },
      {
        association: _this._model.belongsTo(DeviceConfig._model, { foreignKey: 'DevAddr' }),
        where: {
          DevAddr: devAddr,
        },
        attributes: ['ADR', 'frequencyPlan'],
      },
    ],
  }).then(function (res) {
    if (!res) {
      return BluebirdPromise.reject(new Error('No txpk config in DeviceRouting.'));
    }

    return BluebirdPromise.resolve(utils.objHex2Buf(res.get({ plain: true })));
  });
};

module.exports = DeviceRouting;
