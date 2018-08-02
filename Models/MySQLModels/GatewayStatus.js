'use strict';
const {consts} = require('./modules');
const Sequelize = require('sequelize');
const Crud = require('./Crud');

const gatewayStatusDef = function (sequelize) {
  return sequelize.define('GatewayStatus', {
    gatewayId: {
      type: Sequelize.CHAR(consts.GATEWAYID_LEN * 2),
      allowNull: false,
    },
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    time: {
      type: Sequelize.DATE,
    },
    lati: {
      type: Sequelize.FLOAT,
    },
    long: {
      type: Sequelize.FLOAT,
    },
    alti: {
      type: Sequelize.INTEGER,
    },
    rxnb: {
      type: Sequelize.INTEGER.UNSIGNED,
    },
    rxok: {
      type: Sequelize.INTEGER.UNSIGNED,
    },
    rxfw: {
      type: Sequelize.INTEGER.UNSIGNED,
    },
    ackr: {
      type: Sequelize.FLOAT,
    },
    dwnb: {
      type: Sequelize.INTEGER.UNSIGNED,
    },
    txnb: {
      type: Sequelize.INTEGER.UNSIGNED,
    },
  });
};

function GatewayStatus(sequelize) {
  this._model = gatewayStatusDef(sequelize);
}

GatewayStatus.prototype = Object.create(Crud);
GatewayStatus.prototype.constructor = GatewayStatus;

module.exports = GatewayStatus;
