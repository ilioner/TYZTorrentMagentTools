var fs = require('fs')
var mime = require('mime')
var parser = require('range-parser')

// Parse the Range header, if it exists.
var rover = function(info, request) {
  var header = request.headers.range
  if (!header) {
    return null 
  }
  var range = parser(info.size, header)
  return {
    start: range[0].start,
    end: range[0].end,
    type: range.type
  }
}

module.exports = function(path, request, response) {
  if (!fs.existsSync(path)) {
    return false
  }

  var file = fs.statSync(path)
  if (!file || !file.isFile()) {
    return false
  }

  var code = 200
  var headers = {}
  var range = rover(file, request)

  if (range) {
    code = 206
    headers['Accept-Ranges'] = range.type
    headers['Content-Range'] = (
      range.type + ' ' +
      range.start + '-' +
      range.end + '/' +
      file.size
    )
  }
  else {
    range = {
      start: 0,
      end: file.size - 1
    }
  }

  headers['Connection'] = 'keep-alive'
  headers["Content-Length"] = range.end - range.start + 1
  headers['Content-Type'] = mime.lookup(path)

  response.writeHead(code, headers)
 
  var options = {
    start: range.start,
    end: range.end
  }

  fs.createReadStream(path, options)
    .pipe(response)

  return true
}
