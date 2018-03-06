"use strict";

var _get = require("babel-runtime/helpers/get")["default"];

var _inherits = require("babel-runtime/helpers/inherits")["default"];

var _createClass = require("babel-runtime/helpers/create-class")["default"];

var _classCallCheck = require("babel-runtime/helpers/class-call-check")["default"];

var _interopRequireDefault = require("babel-runtime/helpers/interop-require-default")["default"];

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _base_scraper = require('./base_scraper');

var _base_scraper2 = _interopRequireDefault(_base_scraper);

function parseBody($) {
  var rows = $(".tlist .tlistrow");
  var results = rows.map(function (index, element) {
    var row = $(element);
    var name = row.find(".tlistname").text().trim();
    var link = row.find('.tlistdownload a').attr('href');
    var size = row.find(".tlistsize").text().trim();
    var category = row.find('.tlisticon img').attr('alt');
    var seeders = Number(row.find(".tlistsn").text().trim());
    var leechers = Number(row.find(".tlistln").text().trim());
    return {
      name: name,
      link: link,
      category: category,
      size: size,
      seeders: seeders,
      leechers: leechers
    };
  }).toArray().filter(function (r) {
    return r.name && r.link;
  });
  return results;
}

var Nyaa = (function (_BaseScraper) {
  _inherits(Nyaa, _BaseScraper);

  function Nyaa() {
    _classCallCheck(this, Nyaa);

    _get(Object.getPrototypeOf(Nyaa.prototype), "constructor", this).apply(this, arguments);
  }

  _createClass(Nyaa, [{
    key: "name",
    value: function name() {
      return "nyaa";
    }
  }, {
    key: "list",
    value: function list(page, callback) {
      if (page === undefined) page = 0;

      var url = page == 0 ? "http://www.nyaa.se/" : "http://www.nyaa.se/?offset=" + page;
      return this.requestAndParse(url, parseBody, callback);
    }
  }, {
    key: "search",
    value: function search(terms, callback) {
      var query = encodeURIComponent(terms);
      var url = "http://www.nyaa.se/?page=search&term=" + query;
      return this.requestAndParse(url, parseBody, callback);
    }
  }]);

  return Nyaa;
})(_base_scraper2["default"]);

exports["default"] = Nyaa;
module.exports = exports["default"];