'use strict';
const utils = require('../../utils');

const Crud = {
  existItem: function (query) {
    query = utils.objBuf2Hex(query);
    const hashName = query[this.hashKey];
    const key = `${this.hashTable}:${hashName}`;
    return this._ioredis
      .exists(key);
  },

  readItem: function (query, fields) {
    query = utils.objBuf2Hex(query);
    const hashName = query[this.hashKey];
    const key = `${this.hashTable}:${hashName}`;
    let op;
    if (fields) {
      op = this._ioredis
        .hmget(key, fields)
        .then((data) => {
          return utils.joinArray2Obj(fields, data);
        });
    } else {
      op = this._ioredis
        .hgetall(key)
        .then((data) => {
          return utils.objHex2BufPromise(data);
        });
    }

    return op
      .then((data) => {
        return utils.objHex2BufPromise(data);
      })
      .then((data) => {
        return utils.objStrTransformPromise(data, this.transformList);
      });
  },

  createItem: function (vals) {
    vals = utils.objBuf2Hex(vals);
    const hashName = vals[this.hashKey];
    const key = `${this.hashTable}:${hashName}`;
    return this._ioredis
      .hmset(key, vals);
  },

  removeItem: function (query) {
    query = utils.objBuf2Hex(query);
    const hashName = query[this.hashKey];
    const key = `${this.hashTable}:${hashName}`;
    return this._ioredis
      .del(key);
  },

  removeFields: function (query, fields) {
    query = utils.objBuf2Hex(query);
    const hashName = query[this.hashKey];
    const key = `${this.hashTable}:${hashName}`;
    return this._ioredis
      .hdel(key, fields);
  },

  updateFields: function (query, vals) {
    query = utils.objBuf2Hex(query);
    vals = utils.objBuf2Hex(vals);
    const hashName = query[this.hashKey];
    const key = `${this.hashTable}:${hashName}`;
    return this._ioredis
      .hmset(key, vals);
  },

  updateItem: function (query, vals) {
    query = utils.objBuf2Hex(query);
    vals = utils.objBuf2Hex(vals);
    const oldHashName = query[this.hashKey];
    const newHashName = vals[this.hashKey];
    const oldKey = `${this.hashTable}:${oldHashName}`;
    const newKey = `${this.hashTable}:${newHashName}`;
    return this._ioredis
      .multi()
      .rename(oldKey, newKey)
      .hmset(newKey, vals)
      .exec();
  },
};

module.exports = Crud;
