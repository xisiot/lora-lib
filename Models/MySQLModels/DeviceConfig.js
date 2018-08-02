'use strict';

const {consts} = require('./modules');
const Sequelize = require('sequelize');
const Crud = require('./Crud');

const deviceConfig = function (sequelize) {
  return sequelize.define('DeviceConfig', {
    DevAddr: {
      type: Sequelize.CHAR(consts.DEVADDR_LEN * 2),
      primaryKey: true,
    },
    frequencyPlan: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    ADR: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: 1,
    },
    ADR_ACK_LIMIT: {
      type: Sequelize.INTEGER,
      allowNull: true,
      defaultValue: 64,
    },
    ADR_ACK_DELAY: {
      type: Sequelize.INTEGER,
      allowNull: true,
      defaultValue: 32,
    },
    ChMask: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    CFList: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    ChDrRange: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    RX1CFList: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    RX1DRoffset: {
      type: Sequelize.INTEGER,
      allowNull: true,
      defaultValue: 0,
    },
    RX1Delay: {
      type: Sequelize.INTEGER,
      allowNull: true,
      defaultValue: 0,
    },
    RX2Freq: {
      type: Sequelize.FLOAT(6, 3),
      allowNull: true,
    },
    RX2DataRate: {
      type: Sequelize.INTEGER,
      allowNull: true,
    },
    NbTrans: {
      type: Sequelize.INTEGER,
      allowNull: true,
      defaultValue: 1,
    },
    MaxDCycle: {
      type: Sequelize.INTEGER,
      allowNull: true,
      defaultValue: 1,
    },
    MaxEIRP: {
      type: Sequelize.FLOAT,
      allowNull: true,
    },
  },
    //  {
    //   hooks: {
    //     beforeValidate: function (device, options) {

    //       // set default value of device
    //       let col = ['RX1Freq', 'RX1DROffset', 'RX2Freq', 'RX2DataRate'];
    //       let defaultArr = ['DEFAULT_FREQ', 'DEFAULT_RX1DROFFSET', 'DEFAULT_FREQ', 'DEFAULT_RX2DR'];
    //       col.forEach(function (item, index) {
    //         if (!device[item]) {
    //           device[item] = consts[defaultArr[index]]
    //           [consts.FREQUENCY_PLAN_LIST.indexOf(device.FrequencyPlan)];
    //         }

    //       });

    //       if (!device.RX1Delay) {
    //         device.RX1Delay = consts.DEFAULT_RX1DELAY;
    //       }

    //     },
    //   },
    // }
  );
};

function DeviceConfig(sequelize) {
  this._model = deviceConfig(sequelize);
}

DeviceConfig.prototype = Object.create(Crud);
DeviceConfig.prototype.constructor = DeviceConfig;

module.exports = DeviceConfig;
