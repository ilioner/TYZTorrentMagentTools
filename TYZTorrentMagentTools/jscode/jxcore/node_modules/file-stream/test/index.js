var run = require('tape').test
var stream = require('../')
var fs = require('fs')
var http = require('http')
var input = __dirname + '/input'
var output = __dirname + '/output'
var request = require('request')

var server = http.createServer(function(req, res) {
  // If file-stream can’t handle the request 
  // it will return false.
  if (!stream(input, req, res)) {
    res.statusCode = 500
    res.setHeader('Content-Type', 'text/plain')
    res.end('unable to stream ' + filepath + '\n')
  }
}).listen(8080)

run('can stream into a file', function(test) {
  var read = request('http://localhost:8080')
  var write = fs.createWriteStream(output)
  read.pipe(write)
  read.on('end', function() {
    var expected = fs.readFileSync(input)
    var result = fs.readFileSync(output)

    test.equal(result.length, expected.length)
    test.end()

    fs.unlinkSync(output)
    server.close()
  })
})
