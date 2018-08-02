'use strict';

const bluebird = require('bluebird');
const consts = require('../constants');
const crypto = require('crypto');

const _this = new class {
  isEmptyValue(value) {

    // 0, false is valid value in a shadow document
    if (value === null || value === undefined ||
      this.isEmptyArray(value) ||
      this.isEmptyObject(value)) {
      return true;
    }

    return false;
  }

  isString(value) {
    return typeof value === 'string';
  }

  isObject(value) {
    return (value && !Array.isArray(value) && typeof value === 'object');
  }

  isEmptyObject(obj) {
    return this.isObject(obj) && Object.keys(obj).length === 0;
  }

  isArray(value) {
    return Array.isArray(value);
  }

  isEmptyArray(array) {
    return this.isArray(array) && array.length === 0;
  }

  map2Obj(map) {
    let res = {};

    if (!this.isObject(map)) {
      throw new Error('map2Obj: invalid input');
    }

    Object.keys(map).forEach(function (attr) {
      try {
        res[attr] = JSON.parse(map[attr]);
      } catch (ex) {
        res[attr] = map[attr];
        throw new Error('map2Obj: json parse error');
      }
    });

    return res;
  }

  obj2Map(obj) {
    let res = {};

    if (!this.isObject(obj)) {
      throw new Error('obj2Map: invalid input');
    }

    Object.keys(obj).forEach(function (attr) {

      // stringify every type of value, include 'boolean', 'string', 'number', 'object'
      res[attr] = JSON.stringify(obj[attr]);
    });

    return res;
  }

  // join 2 arrays to obj. first array is key; second array is value;
  joinArray2Obj(keyArray, valArray) {
    let res = {};

    if (!this.isArray(keyArray) || !this.isArray(valArray)) {
      throw new Error('joinArray2Obj: invalid input');
    }

    keyArray.forEach(function (key, i) {
      res[key] = valArray[i];
    });

    return res;
  }

  joinArray2ObjPromise(keyArray, valArray, transformList) {
    return bluebird.resolve(this.joinArray2Obj(keyArray, valArray, transformList));
  }

  cloneObj(obj) {
    if (!this.isObject(obj) && !this.isArray(obj)) {
      throw new Error('cloneObj: invalid input');
    }

    return JSON.parse(JSON.stringify(obj));
  }

  parseTopic(topic) {
    var res = {};
    res.raw = topic;
    res.tokens = topic.split('/');
    res.did = res.tokens[2];
    res.operation = res.tokens[4];
    res.status = res.tokens[5];
    res.toString = function () {
      return res.raw;
    };

    return res;
  }

  arrDelRepeat(objArr, objArr2, objArr3) {

    if (objArr && !objArr2 && !objArr3) {
      let res = [];
      let json = {};
      for (let i = 0; i < objArr.length; i++) {
        if (!json[objArr[i]]) {
          res.push(objArr[i]);
          json[objArr[i]] = 1;
        }
      }

      return res;
    } else {
      let res = [];
      res[0] = objArr ? [] : undefined;
      res[1] = objArr2 ? [] : undefined;
      res[2] = objArr3 ? [] : undefined;

      let json = {};
      for (let i = 0; i < objArr.length; i++) {
        if (!json[objArr[i]]) {
          res[0].push(objArr[i]);

          if (objArr2 && objArr2.length === objArr.length) {
            res[1].push(objArr2[i]);
          }

          if (objArr3 && objArr3.length === objArr.length) {
            res[2].push(objArr3[i]);
          }

          json[objArr[i]] = 1;
        }
      }

      return res;
    }
  }

  mergeObjWithBuf(obj1, obj2) {
    let obj1Copy = Object.assign({}, obj1);
    Object.keys(obj2).forEach(function (key) {
      obj1Copy[key] = obj2[key];
    });

    return obj1Copy;
  }

  objBuf2Hex(objBuf, ignoreList) {
    ignoreList = ignoreList || [];
    let objBufCopy = Object.assign({}, objBuf);
    Object.keys(objBufCopy).forEach(function (key) {
      if (ignoreList.indexOf(key) > -1) {
        return;
      }

      if (Buffer.isBuffer(objBufCopy[key])) {
        objBufCopy[key] = objBufCopy[key].toString('hex');
      }

      if (typeof objBufCopy[key] === 'object' && objBufCopy[key].hasOwnProperty('type') && objBufCopy[key].type === 'Buffer') {
        objBufCopy[key] = Buffer.from(objBufCopy[key]).toString('hex');
      }
    });

    return objBufCopy;
  }

  objHex2Buf(objHex, transformList) {
    transformList = transformList || consts.BUF_LIST;
    let objHexCopy = Object.assign({}, objHex);
    Object.keys(objHexCopy).forEach(function (key) {
      if (objHexCopy[key] && transformList.indexOf(key) > -1) {
        objHexCopy[key] = Buffer.from(objHexCopy[key], 'hex');
      }

    });

    return objHexCopy;
  }

  objHex2BufPromise(objHex, transformList) {
    return bluebird.resolve(this.objHex2Buf(objHex, transformList));
  }

  objStr2Int(objStr, transformList) {
    let objStrCopy = Object.assign({}, objStr);
    transformList.forEach((element) => {
      if (objStrCopy[element]) {
        objStrCopy[element] = parseInt(objStrCopy[element]);
      }

    });

    return objStrCopy;
  }

  objStr2IntPromise(objStr, transformList) {
    return bluebird.resolve(this.objStr2Int(objStr, transformList));
  }

  buf2str(buf, times, encoding) {
    times = times || 2;
    encoding = encoding || 'hex';
    let arr = Array(times).fill(buf);
    return Buffer.concat(arr, times * buf.length).toString(encoding);
  }

  bitwiseFilter(objByte, offset, len) {
    const baseBits = Math.pow(2, len) - 1;
    const filterBits = baseBits << offset;
    const resultBits = objByte.readUInt8() & filterBits;
    return resultBits >>> offset;
  }

  bitwiseAssigner(objByte, offset, len, value) {
    const baseBits = Math.pow(2, len) - 1;
    const filterBits = baseBits << offset;

    //All the bitwise operations are based on 32 bits-length int
    //THEREFORE, GET THE LEAST-SIGNIFICANT 8 BITS BY & 0xFF IS CRITICAL!!
    //BUFFER NEEDS TO BE READED AS UINT BEFORE BITWISE OPERATIONS

    const srcBits = objByte.readUInt8() & ((~filterBits) & 0xFF);
    const destBits = (value << offset) & filterBits;
    objByte.writeUInt8(srcBits + destBits);
    return objByte;
  }

  handleDatabaseGet(result, transformList) {
    if (result) {
      result = result.get({ plain: true });
      return this.objHex2Buf(result, transformList);
    } else {
      return {};
    }
  }

  mergeObjDeeply(desObj, srcObj) {

    if (!this.isObject(desObj) || !this.isObject(srcObj)) {
      return new Error('mergeObjDeeply: invalid input');
    }

    let stack = [];

    let run = (desObj, srcObj) => {
      let resObj = {};

      let desProps = Object.keys(desObj);
      desProps.forEach((propName) => {
        resObj[propName] = desObj[propName];
        stack.push(propName);

        if (this.isObject(desObj[propName]) && this.isObject(srcObj[propName])) {
          resObj[propName] = run(desObj[propName], srcObj[propName]);
        } else if (typeof srcObj[propName] !== 'undefined') {
          resObj[propName] = srcObj[propName];
        }

        stack.pop();
      });

      // additional props in srcObj, but not in resObj, just copy
      Object.keys(srcObj).forEach((propName) => {
        if (desProps.indexOf(propName) < 0) {
          stack.push(propName);
          resObj[propName] = srcObj[propName]; //FIXME deep copy
          stack.pop();
        }
      });

      return resObj;
    };

    return run(desObj, srcObj);
  }

  bufferSlice(buf, start, end, rev = true) {
    if (!end) {
      end = buf.length;
    }

    const len = end - start;
    const newBuf = Buffer.alloc(len);
    buf.copy(newBuf, 0, start, end);
    if (rev) {
      return newBuf.reverse();
    } else {
      return newBuf;
    }

  }

  bufferXor(buf1, buf2) {
    for (let ind = 0; ind < buf1.length; ind++) {
      buf1[ind] = buf1[ind] ^ buf2[ind];
    }

    return buf1;
  }

  bufferReverse(buf) {
    return Buffer.from(buf).reverse();
  }

  numToHexBuf(num, buf_len) {

    if (!buf_len || num < 0) {
      return Buffer.alloc(0);
    }

    let str = num.toString(16);
    let str_len = buf_len * 2;

    let tmp = Buffer.alloc(buf_len).toString('hex');
    let fill_len = str_len - str.length;
    if (fill_len >= 0) {
      str = tmp.substr(0, fill_len) + str;
    } else {
      str = str.substr(fill_len);
    }

    return Buffer.from(str, 'hex');
  }

}();

module.exports = _this;
