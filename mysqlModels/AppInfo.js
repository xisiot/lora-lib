'use strict';

const consts = require('../../lib/constants');
const Sequelize = require('sequelize');
const Crud = require('./Crud');

const appInfoDef = function (sequelize) {
  return sequelize.define('AppInfo', {
    AppEUI: {
      type: Sequelize.CHAR(consts.APPEUI_LEN * 2),
      primaryKey: true,
      allowNull: false,
    },
    userID: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    name: {
      type: Sequelize.STRING,
    },
  });
};

function AppInfo(sequelize) {
  this._model = appInfoDef(sequelize);
}

AppInfo.prototype = Object.create(Crud);
AppInfo.prototype.constructor = AppInfo;

module.exports = AppInfo;
