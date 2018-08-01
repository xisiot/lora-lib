const { createLogger, format, transports } = require('winston');
const { combine, timestamp, printf } = format;
const transport = new transports.Console();
const moment = require('moment');
const utils = require('../../utils');
const loggerDict = {};

const cusFormat = printf(function (info) {

  if (typeof info.message === 'string') {
    try {
      info.message = JSON.parse(info.message);
    } catch (error) {
      info.message = info.message;
    }
  }

  const logMessage = {
    level: info.level,
    timestamp: moment().utcOffset(8).format('YYYY-MM-DD HH:mm:ss'),
    label: info.label,
    message: info.message,
  };

  return JSON.stringify(logMessage, function (key, value) {
    return value && value.type === 'Buffer' ? Buffer.from(value.data).toString('hex') : value;
  });
});

function create(opts, loggerName) {
  loggerName = loggerName || 'mainLogger';
  if (!(loggerName in loggerDict)) {
    opts = opts || {};
    loggerDict[loggerName] = createLogger({
      format: combine(
        timestamp(),
        cusFormat,
      ),
      level: opts.level || 'silly',
      colorize: opts.colorize || false,
      transports: [
        transport,
      ],
      exceptionHandlers: [
        transport,
        new transports.File({ filename: "../ERROR.log" }),
      ],
    });
  }

  return loggerDict[loggerName];
}

module.exports = create;
