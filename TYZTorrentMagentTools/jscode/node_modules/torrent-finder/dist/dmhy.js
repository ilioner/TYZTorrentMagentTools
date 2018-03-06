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
  var rows = $("#topic_list tr");
  var results = rows.map(function (index, element) {
    var row = $(element);
    var name = row.find("td.title > a").text().trim();
    var category = row.find("td:nth-child(2)").text().trim();
    var link = row.find('a.arrow-magnet').attr('href');
    var size = row.find("td:nth-child(5)").text().trim();
    var seeders = Number(row.find("td:nth-child(6)").text().trim());
    var leechers = Number(row.find("td:nth-child(7)").text().trim());
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

var Dmhy = (function (_BaseScraper) {
  _inherits(Dmhy, _BaseScraper);

  function Dmhy() {
    _classCallCheck(this, Dmhy);

    _get(Object.getPrototypeOf(Dmhy.prototype), "constructor", this).apply(this, arguments);
  }

  _createClass(Dmhy, [{
    key: "name",
    value: function name() {
      return "dmhy";
    }
  }, {
    key: "list",
    value: function list(page, callback) {
      if (page === undefined) page = 0;

      var url = page == 0 ? "http://share.dmhy.org/" : "http://share.dmhy.org/topics/list/page/" + (page + 1);
      return this.requestAndParse(url, parseBody, callback);
    }
  }, {
    key: "search",
    value: function search(terms, callback) {
      var query = encodeURIComponent(terms);
      var url = "http://share.dmhy.org/topics/list?keyword=" + query;
      return this.requestAndParse(url, parseBody, callback);
    }
  }]);

  return Dmhy;
})(_base_scraper2["default"]);

exports["default"] = Dmhy;
module.exports = exports["default"];