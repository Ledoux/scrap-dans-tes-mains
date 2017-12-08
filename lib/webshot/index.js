'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.webshotToS3 = webshotToS3;

var _stream = require('stream');

var _webshot = require('webshot');

var _webshot2 = _interopRequireDefault(_webshot);

var _utils = require('../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function webshotToS3(url) {
  var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  // check
  var exists = exists(url);
  if (!exists.isExistingUrl) {
    console.warn('not good url');
    return exists;
  }
  // unpack
  var bucketName = config.bucketName,
      s3 = config.s3;

  if (!bucketName) {
    console.warn('You need to provide a bucketName');
    return;
  }
  // promise
  return new Promise(function (resolve, reject) {
    var fileName = url
    //.split('?')[0]
    .replace(/\/$/, '').replace(/\//g, '-').replace(/\./g, '_');
    var getObjectConfig = {
      Bucket: bucketName,
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
  });
}