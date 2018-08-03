'use strict';
const Crud = require('./Crud');
const consts = require('../../constants');

function GatewayInfo(redis) {
  this._ioredis = redis;
  this.hashTable = 'GatewayInfo';
  this.hashKey = 'gatewayId';
  this.integerList = [
    'pullPort',
    'pushPort',
    'version',
  ];
}

GatewayInfo.prototype = Object.create(Crud);
GatewayInfo.prototype.constructor = GatewayInfo;

GatewayInfo.prototype.updateGatewayAddress = function (gatewayConfig) {
  const query = {
    gatewayId: gatewayConfig.gatewayId,
  };

  const fields = {
    address: gatewayConfig.address,
  };

  let identifier;
  if (Buffer.isBuffer(gatewayConfig.identifier)) {
    identifier = gatewayConfig.identifier.readInt8();
  } else if (typeof gatewayConfig.identifier === 'string') {
    identifier = parseInt(gatewayConfig.identifier, 16);
  }

  switch (identifier) {
    case consts.UDP_ID_PUSH_DATA: {
      fields.pushPort = gatewayConfig.port;
      break;
    }

    case consts.UDP_ID_PULL_DATA: {
      fields.pullPort = gatewayConfig.port;
      break;
    }

    default: {
      break;
    }
  }

  return this.updateFields(query, fields);
};

GatewayInfo.prototype.queryGatewayAddress = function (gatewayId) {
  const query = {
    gatewayId,
  };

  const fields = [
    'address',
    'pullPort',
  ];

  return this.readItem(query, fields);
};

module.exports = GatewayInfo;
