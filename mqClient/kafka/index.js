'use strict';
const BluebirdPromise = require('bluebird');
const kafka = require('kafka-node');
const KafkaSchema = require('./schema');
const ConsumerGroup = kafka.ConsumerGroup;
const HighLevelProducer = kafka.HighLevelProducer;


/**
 * Create a new mqClient (kafka)
 */
function MqClient(options, log) {
  this.options = options;
  this.log = log;
}

MqClient.prototype.connect = function () {

  let _this = this;

  _this._consumerGroup = new ConsumerGroup(
    _this.options.consumerGroup.options,
    _this.options.consumerGroup.topics
  );

  const client = new kafka.KafkaClient(_this.options.client);

  _this._producer = new HighLevelProducer(client, _this.options.producer);

  return new BluebirdPromise(function (resolve, reject) {

    const producerConnected = function () {
      if (_this._consumerGroup.ready) {
        return resolve();
      }

    };

    const consumerConnected = function () {
      if (_this._producer.ready) {
        return resolve();
      }

    };

    _this._producer.on('ready', producerConnected.bind(_this));
    _this._producer.on('error', _this.errHandler.bind(_this));
    _this._consumerGroup.on('connect', consumerConnected.bind(_this));
    _this._consumerGroup.on('error', _this.errHandler.bind(_this));
    _this._consumerGroup.on('offsetOutOfRange', _this.errHandler.bind(_this));

    // TODO  load message schema
    /*if (debug.enabled) {
      _this.msgSchema = new KafkaSchema();
    debug('kafka schema: %j', Object.keys(this.msgSchema.map));
    }*/
    // load message schema
    // try {
    //   _this.msgSchema = new KafkaSchema(_this.options);
    // } catch (e) {
    //   return reject(e);
    // }
  });

};

/**
 * produce messages to some topics
 * @param payloads
 */
MqClient.prototype.send = function (payloads) {
  let producer = this._producer;

  return BluebirdPromise.map(payloads, function (item) {

    // item should be object with key: 'messages', 'topic'
    var error;
    switch (typeof item.messages) {
      case 'string':
        break;
      case 'object':
        item.messages = JSON.stringify(item.messages);
        break;
      default:
        error = new Error(JSON.stringify({
          kafkaPublishError: 'Invalid message type. Should be string or object',
          payload: item,
        }));
        break;
    }

    if (typeof item.topic !== 'string') {
      error = new Error(JSON.stringify({
        kafkaPublishError: 'Invalid topic',
        payload: item,
      }));
    }

    if (error) {
      return BluebirdPromise.reject(error);
    } else {
      return BluebirdPromise.resolve(item);
    }
  }).then(function (payloads) {
    return new BluebirdPromise(function (resolve, reject) {
      producer.send(payloads, function (err, data) {
        if (err) { return reject(err); }

        return resolve(data);
      });
    });
  });
};

MqClient.prototype.publish = function (topics, messages) {

  // FIXME: validation of topic, message
  // if (debug.enabled) {
  //   let validate = this.msgSchema.match(topic).validate;
  //   let valid = validate(message);
  //   debug(`validate message of topic: ${topic} ${valid ? 'pass' : 'fail'}`);
  //   if (!valid) {
  //     return BluebirdPromise.reject(new Error(
  //       topic + ' ' +
  //       this.msgSchema.errorsText(validate)
  //     ));
  //   }
  // }
  // validation of topic, message
  // if (this.msgSchema.match(topic)) {
  //   let validate = this.msgSchema.match(topic).validate;
  //   let valid = validate(message);
  //   console.log(`validate message of topic: ${topic} ${valid ? 'pass' : 'fail'}`);
  //   if (!valid) {
  //     return BluebirdPromise.reject(new Error(
  //       topic + ' ' +
  //       this.msgSchema.errorsText(validate)
  //     ));
  //   }
  // }

  const payloads = [];
  if (typeof topics === 'string') {
    topics = [topics];
    messages = [messages];
  }

  topics.forEach(function (topic, topicInd) {
    payloads.push({ topic: topic, messages: messages[topicInd] });
  });

  return this.send(payloads);
};

MqClient.prototype.getSubTopics = function () {
  return this._consumerGroup.topics;
};

MqClient.prototype.disconnect = function () {
  let close = function (client) {
    return new BluebirdPromise(function (resolve, reject) {
      client.close(function (err) {
        if (err) { return reject(err); }

        return resolve();
      });
    });
  };

  return BluebirdPromise.all([
    close(this._producer),
    close(this._consumerGroup),
  ]);
};

MqClient.prototype.message = function (callback) {
  const _this = this;

  const onMessage = function (res) {
    const resObj = Object.assign({}, res);
    try {

      // resObj.value must be json-valid format
      resObj.value = JSON.parse(resObj.value, function (key, value) {
        return value && value.type === 'Buffer' ? Buffer.from(value.data) : value;
      });

      return callback(resObj);
    } catch (error) {

      if (error instanceof SyntaxError) {
        return callback(resObj);
      } else {
        _this.log.error(error);
      }

    }

  };
  _this._consumerGroup.on('message', onMessage);
};

MqClient.prototype.errHandler = function (error) {
  this.log.error(error);
  switch (error.code) {
    case 'ECONNREFUSED':
      process.exit(1);
      break;
    default:
      break;
  }

};

MqClient.prototype.sendUplinkToShadow = function (shadowTopic, shadowPayload, params) {
  const _this = this;
  let topic = _this.options.topics.pubToShadow; // TODO IoT-pub-${nsid}
  let message = {
    from: {
      did: params.did,
    },
    topic: shadowTopic,
    cid: 1, // TODO cid :_this.options.nsid,
    payload: shadowPayload,
  };

  return this.publish(topic, message);
};

module.exports = MqClient;
