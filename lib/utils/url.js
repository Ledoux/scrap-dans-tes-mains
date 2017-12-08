'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.exists = undefined;

var exists = exports.exists = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(url, config) {
    var type, _ref2, headers, ok, status, contentType;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            // unpack
            type = config.type || 'text/html';
            // fetch

            _context.next = 3;
            return fetch(decodeURIComponent(url));

          case 3:
            _ref2 = _context.sent;
            headers = _ref2.headers;
            ok = _ref2.ok;
            status = _ref2.status;
            contentType = headers.get('content-type');
            // check

            return _context.abrupt('return', { isExistingUrl: ok && status === 200,
              isTypeValid: contentType && contentType.includes(type),
              contentType: contentType,
              ok: ok,
              status: status,
              type: type,
              url: url
            });

          case 9:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function exists(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

require('fetch-everywhere');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }