'use strict';
const {utils, consts} = require('./modules');
const BluebirdPromise = require('bluebird');

const Crud = {
  readItem: function (query, fields) {
    query = utils.objBuf2Hex(query);
    let whereOpts = {
      where: query,
    };

    if (fields && (Object.keys(fields).length > 0)) {
      whereOpts.attributes = fields;
    }

    const handleDatabaseRes = function (res) {
      res = utils.handleDatabaseGet(res, consts.BUF_LIST);
      return BluebirdPromise.resolve(res);
    };

    return this._model
      .findOne(whereOpts)
      .then(handleDatabaseRes);
  },

  createItem: function (values) {
    values = utils.objBuf2Hex(values);
    return this._model.create(values);
  },

  removeItem: function (query) {
    query = utils.objBuf2Hex(query);
    let whereOpts = {
      where: query,
    };
    return this._model.destroy(whereOpts);
  },

  updateItem: function (query, values) {
    query = utils.objBuf2Hex(query);
    values = utils.objBuf2Hex(values);
    let whereOpts = {
      where: query,
    };
    return this._model.update(values, whereOpts);
  },

  upsertItem: function (values, query) {
    values = utils.objBuf2Hex(values);
    query = utils.objBuf2Hex(query);
    return this._model.upsert(values, query);
  },

  increaseItem: function (query, incrementVal) {
    query = utils.objBuf2Hex(query);
    let whereOpts = {
      where: query,
    };
    return this._model.findOne(whereOpts).then(function (res) {
      if (!res) {
        return BluebirdPromise.reject(new Error('The DevAddr that uploads data does not exist'));
      }

      return res.increment(incrementVal);
    });
  },

  existItem: function (query) {
    query = utils.objBuf2Hex(query);
    let whereOpts = {
      where: query,
    };
    return this._model.findOne(whereOpts)
      .then((res) => res !== null);
  },

  orderItem: function (query, fields, order, limit, offset) {
    query = utils.objBuf2Hex(query);
    let whereOpts = {
      where: query,
    };

    if (fields && (Object.keys(fields).length > 0)) {
      whereOpts.attributes = fields;
    }

    whereOpts.order = [order]; // e.g. [['id', 'DESC']]

    if (offset && Number.isInteger(offset)) {
      whereOpts.offset = offset;
    }

    if (limit && Number.isInteger(limit)) {
      whereOpts.limit = limit;
    }

    const handleDatabaseRes = function (res) {
      res = utils.handleDatabaseGet(res, consts.BUF_LIST);
      return BluebirdPromise.resolve(res);
    };

    return this._model.findAll(whereOpts)
    .then((res) => {
      return BluebirdPromise.map(res, handleDatabaseRes);
    });

  }
};

module.exports = Crud;
