'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parse = undefined;

var parse = exports.parse = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(url) {
    var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var pythonUrl, pythonParse, parseUrl, result, jsParse, dom, document, relativeMatch, methodName, method;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            // unpack
            pythonUrl = config.pythonUrl;
            // check

            pythonParse = void 0;

            if (!pythonUrl) {
              _context.next = 10;
              break;
            }

            parseUrl = pythonUrl + '/parse?url=' + url;
            _context.next = 6;
            return fetch(parseUrl);

          case 6:
            result = _context.sent;
            _context.next = 9;
            return result.json();

          case 9:
            pythonParse = _context.sent;

          case 10:
            // console.log('pythonParse', tinify(pythonParse))
            // jsdom
            jsParse = void 0;
            _context.next = 13;
            return _jsdom.JSDOM.fromURL(url);

          case 13:
            dom = _context.sent;
            document = dom.window && dom.window.document;

            if (typeof document !== 'undefined') {
              // here we determine the method name, for the moment
              // a method name is equivalent to a host name
              relativeMatch = url.match(/^(?:https?:)?(?:\/\/)?([^\/\?]+)/);
              methodName = relativeMatch && relativeMatch[1];
              method = _methods.methodsByName[methodName] || _methods.methodsByName['default'];
              // call the method and resolve

              jsParse = method && method(document, url);
            }
            // console.log('jsParse', tinify(jsParse))
            // return
            return _context.abrupt('return', (0, _lodash2.default)({}, pythonParse, jsParse));

          case 17:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function parse(_x) {
    return _ref.apply(this, arguments);
  };
}();

var _jsdom = require('jsdom');

var _lodash = require('lodash.merge');

var _lodash2 = _interopRequireDefault(_lodash);

var _methods = require('./methods');

var _tinify = require('../utils/tinify');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }