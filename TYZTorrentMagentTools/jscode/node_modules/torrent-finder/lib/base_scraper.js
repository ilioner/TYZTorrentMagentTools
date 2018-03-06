import request from 'request'
import cheerio from 'cheerio'
import {Promise} from 'es6-promise'

export default class BaseScraper {
  constructor(options) {
  }

  requestAndParse(httpParams, parser, callback) {
    if (typeof callback === 'function') {
      request(httpParams, (error, response, body) => {
        if (error) {
          callback(error, null)
          return
        }
        callback(null, parser(cheerio.load(body)))
      })
      return
    }

    return new Promise(function(resolve, reject) {
        var categories;
        request(httpParams, (error, response, body) => {
          if (error) {
            reject(error)
            return
          }
          resolve(parser(cheerio.load(body)))
        })
    });
  }
}
