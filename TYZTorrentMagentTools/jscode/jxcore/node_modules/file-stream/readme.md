# file-stream
file-stream is a little HTTP server helper that streams binary resources. These resources will commonly be audio or video, but any type of file is fair game.

[![Build status](https://travis-ci.org/michaelrhodes/file-stream.png?branch=master)](https://travis-ci.org/michaelrhodes/file-stream)

## Install
```
npm install file-stream
```

## API
``` 
file-stream(
 
  path (string):
    the filesystem path of the file being requested.

  request (IncomingMessage):
    the request object provided by http.createServer.

  response (ServerResponse):
    the response object provided by http.createServer.

)

=> handled (boolean)
```

### Example
``` js
var http = require('http')
var stream = require('file-stream')
var filepath = '/path/to/file'

http.createServer(function(req, res) {

  // If file-stream can’t handle the request 
  // it will return false.
  if (!stream(filepath, req, res)) {
    res.statusCode = 500
    res.setHeader('Content-Type', 'text/plain')
    res.end('unable to stream ' + filepath + '\n')
  }

}).listen(8080)
```

### License
[MIT](http://opensource.org/licenses/MIT)
