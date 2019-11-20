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
//      .then(handleDatabaseRes);
  },

  readItems: function (query, fields, from, size) {
    query = utils.objBuf2Hex(query);
    from = parseInt(from);
    size = parseInt(size);
    let whereOpts = {};
    let offset = 0;
    if (!from && !size) {
      whereOpts = {
        where: query,
        order: [['updatedAt', 'DESC']],
      };
    } else {
      if (!from) {
        from = 1;
      } else if (!size) {
        size = 10;
      }
      offset = (from - 1) * size;
      whereOpts = {
        where: query,
        offset: offset,
        limit: size,
        order: [['updatedAt', 'DESC']],
      };
    }

    if (fields && (Object.keys(fields).length > 0)) {
      whereOpts.attributes = fields;
    }

    return this._model
      .findAndCountAll(whereOpts)
      .then(res => {
        if (size) {
          res.pagecount = res.count % size === 0 ? parseInt(res.count / size) : parseInt(res.count / size) + 1;
        } else if (from) {
          res.pagecount = res.count % 10 === 0 ? parseInt(res.count / 10) : parseInt(res.count / 10) + 1;
        } else {
          res.pagecount = 1;
        }
        return res;
      });
    // .then(handleDatabaseRes);
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
