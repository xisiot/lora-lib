'use strict';
const {consts} = require('./modules');
const Sequelize = require('sequelize');
const Crud = require('./Crud');

const gatewayInfoDef = function (sequelize) {
  return sequelize.define('GatewayInfo', {
    gatewayId: {
      type: Sequelize.CHAR(consts.GATEWAYID_LEN * 2),
      primaryKey: true,
    },
    userID: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    frequencyPlan: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    location: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    RFChain: {
      type: Sequelize.INTEGER.UNSIGNED,
      allowNull: true,
      defaultValue: 0,
    },
    type: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    model: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    description: {
      type: Sequelize.STRING,
      allowNull: true,
    },
  });
};

function GatewayInfo(sequelize) {
  this._model = gatewayInfoDef(sequelize);
}

GatewayInfo.prototype = Object.create(Crud);
GatewayInfo.prototype.constructor = GatewayInfo;

module.exports = GatewayInfo;
