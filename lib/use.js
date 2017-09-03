'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useScrap = undefined;

var _awsSdk = require('aws-sdk');

var _awsSdk2 = _interopRequireDefault(_awsSdk);

var _jsdom = require('jsdom');

var _jsdom2 = _interopRequireDefault(_jsdom);

var _stream = require('stream');

var _webshot = require('webshot');

var _webshot2 = _interopRequireDefault(_webshot);

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var useScrap = exports.useScrap = function useScrap(app, config) {
  // unpack
  var awsConfig = config.awsConfig,
      bucketName = config.bucketName,
      routePath = config.routePath,
      webshotsBucket = config.webshotsBucket;
  // update

  var s3 = new _awsSdk2.default.S3();
  _awsSdk2.default.config.update(awsConfig);
  // s3
  var getWebshotUrl = function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(url) {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              return _context.abrupt('return', new Promise(function (resolve, reject) {
                var fileName = url
                //.split('?')[0]
                .replace(/\/$/, '').replace(/\//g, '-').replace(/\./g, '_');
                var getObjectConfig = {
                  Bucket: BucketName,
                  Key: 'webshots/' + fileName
                };
                var uploadConfig = Object.assign({
                  ContentType: 'image/png',
                  ACL: 'public-read'
                }, getObjectConfig);
                // check first
                s3.headObject(uploadConfig, function (err, metadata) {
                  // handle no object on cloud here
                  if (err && err.code === 'NotFound') {
                    reject(err);
                  } else {
                    // Try to get an existing object
                    s3.getObject(getObjectConfig).on('success', function (response) {
                      // just get the signedUrl
                      s3.getSignedUrl('getObject', getObjectConfig, function (err, signedUrl) {
                        if (err) {
                          reject(err);
                          return;
                        } else if (signedUrl) {
                          var webshotUrl = signedUrl.split('?')[0];
                          resolve(webshotUrl);
                        }
                      });
                    }).on('error', function (error) {
                      // do the webshot
                      var renderStream = (0, _webshot2.default)(url, function (err, stream) {
                        uploadConfig.Body = new _stream.Readable().wrap(stream);
                        s3.upload(uploadConfig, function (err, payload) {
                          if (err) {
                            reject(err);
                          } else {
                            resolve(payload.Location);
                          }
                        });
                      });
                    }).send();
                  }
                });
              }).catch(function (err) {
                return console.warn(err);
              }));

            case 1:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, undefined);
    }));

    return function getWebshotUrl(_x) {
      return _ref.apply(this, arguments);
    };
  }();
  // get
  app.get(routePath, function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
      var url, json, scrap, webshotUrl;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              // unpack
              url = req.query.url;
              // json

              json = {};
              // try

              _context2.prev = 2;
              _context2.next = 5;
              return (0, _utils.getScrap)(url);

            case 5:
              scrap = _context2.sent;

              json.scrap = scrap;
              // webshot, make sure the scrap worked first
              _context2.t0 = scrap;

              if (!_context2.t0) {
                _context2.next = 12;
                break;
              }

              _context2.next = 11;
              return getWebshotUrl(url);

            case 11:
              _context2.t0 = _context2.sent;

            case 12:
              webshotUrl = _context2.t0;

              json.webshotUrl = webshotUrl;
              //
              _context2.next = 20;
              break;

            case 16:
              _context2.prev = 16;
              _context2.t1 = _context2['catch'](2);

              json.error = _context2.t1;
              console.warn('scrap api', _context2.t1);

            case 20:
              // send
              res.json(json);

            case 21:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, undefined, [[2, 16]]);
    }));

    return function (_x2, _x3) {
      return _ref2.apply(this, arguments);
    };
  }());
};