const modules = {};

try {
  const Redis = require('ioredis');
  const createRedisClient = function (config) {
    const _ioredis = config.cluster ?
      new Redis.Cluster(config.options) :
      new Redis(config.options[0]);

    _ioredis.once('connect', function (err) {
      _ioredis.client('setname', `${process.pid}.db`);
    });

    return _ioredis;
  };
  modules.createRedisClient = createRedisClient;
} catch (error) {
}

try {
  const Sequelize = require('sequelize');
  const createSequelizeClient = function (config) {
    return new Sequelize(
      config.database,
      config.username,
      config.password,
      config
    );
  };

  modules.createSequelizeClient = createSequelizeClient;
} catch (error) {
}

try {
  const mongoose = require('mongoose');
  const createMongoClient = function (config) {

    const url = `mongodb://${config.host}:${config.port}/${config.db}`;
    mongoose.connect(url, { useNewUrlParser: true });

    const db = mongoose.connection;

    return db;
  };

  modules.createMongoClient = createMongoClient;
} catch (error) {
}

module.exports = modules;
