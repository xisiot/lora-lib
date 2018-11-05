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
      'ADR'
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

module.exports = DeviceInfo;
