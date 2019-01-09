'use strict';

const BluebirdPromise = require('bluebird');
const utils = require('../../utils/index');

function MessageQueue(redis) {
  this._ioredis = redis;
}

MessageQueue.prototype.consume = function (mq) {

  let _this = this;
  return _this._ioredis.lpop(mq).then(function (res) {
    return BluebirdPromise.resolve(!res ? res : JSON.parse(res));
  });
};

MessageQueue.prototype.checkQueueLength = function (mq) {

  let _this = this;
  return _this._ioredis.llen(mq).then(function (res) {
    return BluebirdPromise.resolve(res);
  });
};

MessageQueue.prototype.produce = function (mq, src, protoBufUnit, AppEUI) {

  let _this = this;

  if (!utils.isObject(src) || utils.isEmptyValue(src.data)) {
    return BluebirdPromise.reject(
      new Error(JSON.stringify({
        message: 'MessageQueue Input src should be an object && Contains keyword \'data\'',
        AppEUI: AppEUI,
        scr: src,
      })));
  }

  return _this.consume(mq).then(function (des) {
    if (!des) {
      des = src;
      des.aggregation = 0;
    } else {
      des = utils.mergeObjDeeply(des, src);
      des.aggregation++;
    }

    return protoBufUnit.JSONToPBUnit(des.data, AppEUI)
      .then(function (res) {
        if (!Buffer.isBuffer(res) && typeof res === 'object') {
          return BluebirdPromise.reject(new Error(JSON.stringify({
            message: 'Revice Object Data and No PB Config',
            AppEUI: AppEUI,
            data: des.data,
          })));
        }

        let pbBufStr = res.toString('hex');
        des.pbdata = pbBufStr;

        return _this._ioredis.rpush(mq, JSON.stringify(des));
      });
  }).then(function (res) {
    if (res > 0) {
      return BluebirdPromise.resolve(true);
    }

    return BluebirdPromise.reject(new Error('push failed.'));
  });
};

MessageQueue.prototype.produceByHTTP = function (mq, downlinkString) {
  let _this = this;
  const writeObj = {
    pbdata: null,
    data: null,
    aggregation: null,
  };
  writeObj.pbdata = downlinkString;
  writeObj.data = downlinkString;
  writeObj.aggregation = 0;
  return _this._ioredis.rpush(mq, JSON.stringify(writeObj));
}
module.exports = MessageQueue;
