import BaseScraper from './base_scraper'

const USER_AGENT = "Mozilla/5.0 (Windows NT 6.3; rv:36.0) Gecko/20100101 Firefox/36.0"

function parseBody($) {
  var rows = $("#index_maintable tr")
  var results = rows.map((index, element) => {
    var row = $(element)
    var name = row.find(".inde_tab_seedname a").text().trim()
    var link = row.find('td:nth-child(10) a').attr('href')
    var category = row.find('td:nth-child(3)').text().trim()
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

export default class Popgo extends BaseScraper {
  name() {
    return "popgo"
  }

  list(page=0, callback) {
    var url = (page == 0) ? "http://share.popgo.org/" : `http://share.popgo.org/search.php?title=&groups=&uploader=&sorts=&orderby=&page=${page+1}`
    var httpParams = {uri: url, headers: {'User-Agent': USER_AGENT}, gzip: true}
    return this.requestAndParse(httpParams, parseBody, callback)
  }

  search(terms, callback) {
    var query = encodeURIComponent(terms)
    var url = `http://share.popgo.org/search.php?title=${query}&groups=&uploader=&sorts=&orderby=`
    var httpParams = {uri: url, headers: {'User-Agent': USER_AGENT}, gzip: true}
    return this.requestAndParse(httpParams, parseBody, callback)
  }
}
