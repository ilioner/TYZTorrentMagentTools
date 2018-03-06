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
  var rows = $("#searchResult tr");
  var results = rows.map(function (index, element) {
    var row = $(element);
    var name = row.find(".detLink").text().trim();
    var link = row.find('*[alt="Magnet link"]').parent().attr('href');
    var description = row.find(".detDesc").text().trim();
    var matched = description.match(/Size (.+),/);
    var size = matched ? matched[1] : null;
    var category = row.find(".vertTh a:nth-child(1)").text().trim();
    var seeders = Number(row.find("td:nth-child(3)").text().trim());
    var leechers = Number(row.find("td:nth-child(4)").text().trim());

    return {
      name: name,
      link: link,
      size: size,
      category: category,
      seeders: seeders,
      leechers: leechers
    };
  }).toArray().filter(function (r) {
    return r.name && r.link;
  });
  return results;
}

var Piratebay = (function (_BaseScraper) {
  _inherits(Piratebay, _BaseScraper);

  function Piratebay(options) {
    _classCallCheck(this, Piratebay);

    _get(Object.getPrototypeOf(Piratebay.prototype), "constructor", this).call(this, options);
    this.baseUrl = options && options.baseUrl ? options.baseUrl : 'https://thepiratebay.gd';
  }

  _createClass(Piratebay, [{
    key: "name",
    value: function name() {
      return "piratebay";
    }
  }, {
    key: "list",
    value: function list(page, callback) {
      if (page === undefined) page = 0;

      var url = page == 0 ? this.baseUrl + "/recent" : this.baseUrl + "/recent/" + page;
      return this.requestAndParse(url, parseBody, callback);
    }
  }, {
    key: "search",
    value: function search(terms, callback) {
      var query = encodeURIComponent(terms);
      var url = this.baseUrl + "/s/?q=" + query + "&page=0&orderby=99";
      return this.requestAndParse(url, parseBody, callback);
    }
  }]);

  return Piratebay;
})(_base_scraper2["default"]);

exports["default"] = Piratebay;
module.exports = exports["default"];