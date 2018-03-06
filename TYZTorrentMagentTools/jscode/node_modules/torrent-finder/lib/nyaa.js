import BaseScraper from './base_scraper'

function parseBody($) {
  var rows = $(".tlist .tlistrow")
  var results = rows.map((index, element) => {
    var row = $(element)
    var name = row.find(".tlistname").text().trim()
    var link = row.find('.tlistdownload a').attr('href')
    var size = row.find(".tlistsize").text().trim()
    var category = row.find('.tlisticon img').attr('alt')
    var seeders = Number(row.find(".tlistsn").text().trim())
    var leechers = Number(row.find(".tlistln").text().trim())
    return {
      name: name,
      link: link,
      category: category,
      size: size,
      seeders: seeders,
      leechers: leechers
    }
  }).toArray().filter((r) => r.name && r.link)
  return results
}

export default class Nyaa extends BaseScraper {
  name() {
    return "nyaa"
  }

  list(page=0, callback) {
    var url = (page == 0) ? "http://www.nyaa.se/" : `http://www.nyaa.se/?offset=${page}`
    return this.requestAndParse(url, parseBody, callback)
  }

  search(terms, callback) {
    var query = encodeURIComponent(terms)
    var url = "http://www.nyaa.se/?page=search&term=" + query
    return this.requestAndParse(url, parseBody, callback)
  }
}
