import BaseScraper from './base_scraper'

function parseBody($) {
  var rows = $("#topic_list tr")
  var results = rows.map((index, element) => {
    var row = $(element)
    var name = row.find("td.title > a").text().trim()
    var category = row.find("td:nth-child(2)").text().trim()
    var link = row.find('a.arrow-magnet').attr('href')
    var size = row.find("td:nth-child(5)").text().trim()
    var seeders = Number(row.find("td:nth-child(6)").text().trim())
    var leechers = Number(row.find("td:nth-child(7)").text().trim())
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

export default class Dmhy extends BaseScraper {
  name() {
    return "dmhy"
  }

  list(page=0, callback) {
    var url = (page == 0) ? "http://share.dmhy.org/" : `http://share.dmhy.org/topics/list/page/${page+1}`
    return this.requestAndParse(url, parseBody, callback)
  }

  search(terms, callback) {
    var query = encodeURIComponent(terms)
    var url = `http://share.dmhy.org/topics/list?keyword=${query}`
    return this.requestAndParse(url, parseBody, callback)
  }
}
