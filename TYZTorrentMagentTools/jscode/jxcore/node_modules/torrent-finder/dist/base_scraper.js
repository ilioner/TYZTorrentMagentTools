'use strict';

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

var _cheerio = require('cheerio');

var _cheerio2 = _interopRequireDefault(_cheerio);

var _es6Promise = require('es6-promise');

var BaseScraper = (function () {
  function BaseScraper(options) {
    _classCallCheck(this, BaseScraper);
  }

  _createClass(BaseScraper, [{
    key: 'requestAndParse',
    value: function requestAndParse(httpParams, parser, callback) {
      if (typeof callback === 'function') {
        (0, _request2['default'])(httpParams, function (error, response, body) {
          if (error) {
            callback(error, null);
            return;
          }
          callback(null, parser(_cheerio2['default'].load(body)));
        });
        return;
      }

      return new _es6Promise.Promise(function (resolve, reject) {
        var categories;
        (0, _request2['default'])(httpParams, function (error, response, body) {
          if (error) {
            reject(error);
            return;
          }
          resolve(parser(_cheerio2['default'].load(body)));
        });
      });
    }
  }]);

  return BaseScraper;
})();

exports['default'] = BaseScraper;
module.exports = exports['default'];