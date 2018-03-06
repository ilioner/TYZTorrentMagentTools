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

var USER_AGENT = "Mozilla/5.0 (Windows NT 6.3; rv:36.0) Gecko/20100101 Firefox/36.0";

function parseBody($) {
  var rows = $("#index_maintable tr");
  var results = rows.map(function (index, element) {
    var row = $(element);
    var name = row.find(".inde_tab_seedname a").text().trim();
    var link = row.find('td:nth-child(10) a').attr('href');
    var category = row.find('td:nth-child(3)').text().trim();
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

var Popgo = (function (_BaseScraper) {
  _inherits(Popgo, _BaseScraper);

  function Popgo() {
    _classCallCheck(this, Popgo);

    _get(Object.getPrototypeOf(Popgo.prototype), "constructor", this).apply(this, arguments);
  }

  _createClass(Popgo, [{
    key: "name",
    value: function name() {
      return "popgo";
    }
  }, {
    key: "list",
    value: function list(page, callback) {
      if (page === undefined) page = 0;

      var url = page == 0 ? "http://share.popgo.org/" : "http://share.popgo.org/search.php?title=&groups=&uploader=&sorts=&orderby=&page=" + (page + 1);
      var httpParams = { uri: url, headers: { 'User-Agent': USER_AGENT }, gzip: true };
      return this.requestAndParse(httpParams, parseBody, callback);
    }
  }, {
    key: "search",
    value: function search(terms, callback) {
      var query = encodeURIComponent(terms);
      var url = "http://share.popgo.org/search.php?title=" + query + "&groups=&uploader=&sorts=&orderby=";
      var httpParams = { uri: url, headers: { 'User-Agent': USER_AGENT }, gzip: true };
      return this.requestAndParse(httpParams, parseBody, callback);
    }
  }]);

  return Popgo;
})(_base_scraper2["default"]);

exports["default"] = Popgo;
module.exports = exports["default"];