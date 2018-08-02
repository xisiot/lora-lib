const _ = require('lodash');
const path = require('path');
const Ajv = require('ajv');

const defaultOptions = {
  schemaPath: {
    messages: 'config/messages.json',
    common: 'config/common.json',
  },
};

let parseParams = function (topic) {
  let params = {};
  let pattern = /\${\w+}/g;
  let found;
  while ((found = pattern.exec(topic)) !== null) {
    let param = found[0].match(/\w+/);
    params[param] = found;
  }

  return params;
};

let replaceParams = function (topic, options) {
  let params = parseParams(topic);
  let res = topic;
  Object.keys(params).forEach(function (param) {
    let match = params[param][0];
    if (_.has(options, param)) {
      res = res.replace(match, options[param]);
    }
  });

  return res;
};

function Schema(options) {
  this.options = options || {};
  _.defaultsDeep(this.options, defaultOptions);

  const ajv = new Ajv({ allErrors: true, extendRefs: true });
  const schema = require(path.join('../../../../../', this.options.schemaPath.messages));
  const common = require(path.join('../../../../../', this.options.schemaPath.common));
  ajv.addSchema(common);

  this.ajv = ajv;
  this.map = {};

  Object.keys(schema).forEach(function (topicPattern) {
    let topic = replaceParams(topicPattern, options);
    this.map[topic] = {
      schema: schema[topicPattern],
      validate: ajv.compile(schema[topicPattern]),
    };
  }.bind(this));
}

let prototype = Schema.prototype;

prototype.errorsText = function (validate) {
  return this.ajv.errorsText(validate.errors);
};

prototype.match = function (topic) {
  return _.has(this.map, topic) ? this.map[topic] : null;
};

module.exports = Schema;
