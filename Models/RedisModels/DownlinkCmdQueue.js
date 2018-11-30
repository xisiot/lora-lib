'use strict';

const BluebirdPromise = require('bluebird');
const utils = require('../../utils');

function DownlinkCmdQueue(redis) {
  this._ioredis = redis;
}

DownlinkCmdQueue.prototype.checkQueueLength = function (mq) {

  let _this = this;
  return _this._ioredis.llen(mq).then(function (res) {
    return BluebirdPromise.resolve(res);
  });
};

DownlinkCmdQueue.prototype.getAll = function (mq) {

  let _this = this;
  return _this._ioredis.lrange(mq, 0, -1).then((res) => {
    let queueArr = res;
    queueArr.forEach((element, index) => {
      try {
        element = JSON.parse(element);
      }
      catch (error) {
        element = element;
      }
    });

    return BluebirdPromise.resolve(queueArr);
  });
};

DownlinkCmdQueue.prototype.removeAll = function (mq) {
  let _this = this;
  return _this._ioredis.del(mq);
};

DownlinkCmdQueue.prototype.consume = function (mq) {

  let _this = this;
  return _this._ioredis.lpop(mq).then(function (res) {
    return BluebirdPromise.resolve(!res ? res : JSON.parse(res));
  });
};

DownlinkCmdQueue.prototype.produce = function (mq, src) {

  let _this = this;
  if (!utils.isObject(src)) {
    return BluebirdPromise.reject(new Error('src should be an object'));
  }

  return _this._ioredis.rpush(mq, JSON.stringify(src))
    .then(function (res) {
      if (res >= 1) {
        return BluebirdPromise.resolve();
      }

      return BluebirdPromise.reject(new Error('DownlinkCmdQueue Push failed.'));
    });
};

DownlinkCmdQueue.prototype.delete = function (mq) {
  let _this = this;
  return _this._ioredis.rpop(mq).then(function (res) {
    return BluebirdPromise.resolve(!res ? res : JSON.parse(res));
  });
}

DownlinkCmdQueue.prototype.trim = function (mq, start, end) {
  let _this = this;
  return _this._ioredis.ltrim(mq, start, end)
    .then((res) => {
      if (res == 'OK') {
        return BluebirdPromise.resolve();
      }

      return BluebirdPromise.reject(new Error('DownlinkCmdQueue trim failed'));
    });
}

module.exports = DownlinkCmdQueue;
