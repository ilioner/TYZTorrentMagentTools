import BaseScraper from './base_scraper'

function parseBody($) {
  var rows = $("#searchResult tr")
  var results = rows.map((index, element) => {
    var row = $(element)
    var name = row.find(".detLink").text().trim()
    var link = row.find('*[alt="Magnet link"]').parent().attr('href')
    var description = row.find(".detDesc").text().trim()
    var matched = description.match(/Size (.+),/)
    var size = matched ? matched[1] : null
    var category = row.find(".vertTh a:nth-child(1)").text().trim()
    var seeders = Number(row.find("td:nth-child(3)").text().trim())
    var leechers = Number(row.find("td:nth-child(4)").text().trim())

    return {
      name: name,
      link: link,
      size: size,
      category: category,
      seeders: seeders,
      leechers: leechers
    }
  }).toArray().filter((r) => r.name && r.link)
  return results
}

export default class Piratebay extends BaseScraper {
  constructor(options) {
    super(options)
    this.baseUrl = options && options.baseUrl ? options.baseUrl : 'https://thepiratebay.gd'
  }

  name() {
    return "piratebay"
  }

  list(page=0, callback) {
    var url = (page == 0) ? `${this.baseUrl}/recent` : `${this.baseUrl}/recent/${page}`
    return this.requestAndParse(url, parseBody, callback)
  }

  search(terms, callback) {
    var query = encodeURIComponent(terms)
    var url = `${this.baseUrl}/s/?q=${query}&page=0&orderby=99`
    return this.requestAndParse(url, parseBody, callback)
  }
}
