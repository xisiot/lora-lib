'use strict';

const {
  consts
} = require('./modules');
const Sequelize = require('sequelize');
const Crud = require('./Crud');

const app2devType = function(sequelize) {
  return sequelize.define('App2PB', {
    AppEUI: {
      type: Sequelize.CHAR(consts.APPEUI_LEN * 2),
      primaryKey: true,
      allowNull: false,
    },
    message: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    msg: {
      type: Sequelize.STRING,
      allowNull: true,
    },
  });
};

function App2PB(sequelize) {
  this._model = app2devType(sequelize);
}

App2PB.prototype = Object.create(Crud);
App2PB.prototype.constructor = App2PB;
module.exports = App2PB;
