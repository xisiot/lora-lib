'use strict';
const Crud = require('./Crud');

function DeviceInfo(redis) {
  this._ioredis = redis;
  this.hashTable = 'DeviceInfo';
  this.hashKey = 'DevAddr';
  this.transformList = {
    integerList: [
      'frequencyPlan',
      'RX1DRoffset',
      'RX1Delay',
      'FCntUp',
      'NFCntDown',
      'AFCntDown',
      'tmst',
      'rfch',
      'powe'
    ],
    floatList: [
      'freq'
    ],
    booleanList: [
      'ADR',
      'imme',
      'ipol'
    ]
  };
}

DeviceInfo.prototype = Object.create(Crud);
DeviceInfo.prototype.constructor = DeviceInfo;

DeviceInfo.prototype.read = function (DevAddr, fields) {
  const query = {
    DevAddr
  };

  return this.readItem(query, fields);
};

DeviceInfo.prototype.update = function (DevAddr, fields) {
  const query = {
    DevAddr
  };

  return this.updateFields(query, fields);
};

DeviceInfo.prototype.increaseAfcntdown = function (DevAddr) {
  const query = {
    DevAddr
  };

  return this.readItem(query, ['AFCntDown'])
    .then((res) => {
      res.AFCntDown += 1;
      return this.updateFields(query, res);
    });
};

module.exports = DeviceInfo;
