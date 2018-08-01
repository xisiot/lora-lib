const utils = require('../../utils');

class BasicError extends Error {
  constructor(message) {
    message = JSON.stringify(message, function (key, value) {
      return value && value.type === 'Buffer' ? Buffer.from(value.data).toString('hex') : value;
    });

    super(message);
    // Saving class name in the property of our custom error as a shortcut.
    this.name = this.constructor.name;

    // Capturing stack trace, excluding constructor call from it.
    Error.captureStackTrace(this, this.constructor);

    // You can use any additional properties you want.
  }
}

module.exports = {
  MICMismatchError: class extends BasicError {
    constructor(message) {
      super(message);
    }
  },

  MsgTypeError: class extends BasicError {
    constructor(message) {
      super(message);
    }
  },

  UDPVersionError: class extends BasicError {
    constructor(message) {
      super(message);
    }
  },

  DeviceNotExistError: class extends BasicError {
    constructor(message) {
      super(message);
    }
  },

  GatewayNotExistError: class extends BasicError {
    constructor(message) {
      super(message);
    }
  },

  DevNonceRepetitionError: class extends BasicError {
    constructor(message) {
      super(message);
    }
  },

  JsonSchemaError: class extends BasicError {
    constructor(message) {
      super(message);
    }
  },

  JSONParseError: class extends BasicError {
    constructor(message) {
      super(message);
    }
  },

  InvalidMessageError: class extends BasicError {
    constructor(message) {
      super(message);
    }
  },

  UDPPortError: class extends BasicError {
    constructor(message) {
      super(message);
    }
  },

  InvalidFCntError: class extends BasicError {
    constructor(message) {
      super(message);
    }
  },

  ProtoBufError: class extends BasicError {
    constructor(message) {
      super(message);
    }
  },

  MACCommandCidError: class extends BasicError {
    constructor(message) {
      super(message);
    }
  },

  MACCommandPayloadFormatError: class extends BasicError {
    constructor(message) {
      super(message);
    }
  },
}
