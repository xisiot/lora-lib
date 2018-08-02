'use strict';

const {consts} = require('./modules');
const Sequelize = require('sequelize');
const Crud = require('./Crud');

const developersDef = function (sequelize) {
  return sequelize.define('Developers', {
    developer_id: {
      type: Sequelize.CHAR(32),
      primaryKey: true,
    },
    email: {
      type: Sequelize.STRING(64),
      allowNull: false,
      unique: true,
    },
    password: {
      type: Sequelize.CHAR(32),
      allowNull: false,
    },
    is_login: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: 0,
    },
    name: {
      type: Sequelize.STRING(64),
      allowNull: false,
    },
    company_name: {
      type: Sequelize.STRING(64),
      allowNull: true,
    },
    company_address: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
    phone: {
      type: Sequelize.CHAR(20),
      allowNull: true,
    },
    time: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  });
};

function Developers(sequelize) {
  this._model = developersDef(sequelize);
}

Developers.prototype = Object.create(Crud);
Developers.prototype.constructor = Developers;

module.exports = Developers;

