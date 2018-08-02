function MQTTTopics(redis) {
  this._ioredis = redis;
}

MQTTTopics.prototype.addTopics = function (did, config) {
  const pipeline = this._ioredis.pipeline();
  const topicsValues = `${config.cloudId}:${config.loraId}`;

  config.suffix.forEach((element) => {
    let topic = config.prefix + did + element;
    pipeline.sadd(topic, topicsValues);
  });

  return pipeline.exec();
};

module.exports = {
  MQTTTopics,
};
