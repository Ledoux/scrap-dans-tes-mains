'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getScrap = getScrap;

var _jsdom = require('jsdom');

var _jsdom2 = _interopRequireDefault(_jsdom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getScrap(url) {
  _jsdom2.default.env(url, function (error, _ref) {
    var document = _ref.document;

    if (error) {
      reject(error);
      return;
    } else if (typeof document === 'undefined') {
      resolve({});
    } else {
      // here we determine the scrapper name
      var relativeMatch = url.match(/^(?:https?:)?(?:\/\/)?([^\/\?]+)/);
      var hostName = relativeMatch && relativeMatch[1];
      var scrapper = scrapperByHostName[hostName];
      // call the scrapper and resolve
      resolve(scrapper && scrapper(document));
    }
  });
}