var fs = require('fs')
var path = require('path')
var replace = require('replacestream')

var dirname = path.dirname(require.main.filename)
var root = dirname.split('/node_modules/')[0]

// spa('index.html')
// spa('views/layout.html')
// spa(__dirname + '/main.html')
// spa({ VERSION: '1.1' })
module.exports = spa

function spa (pathname, replacements) {
  if (typeof pathname != 'string') {
    replacements = pathname
    pathname = null
  }
  if (!pathname) pathname = 'index.html'
  if (isRelative(pathname)) {
    pathname = path.join(root, pathname)
  }
  if (!replacements) {
    replacements = {}
  }

  function middleware (req, res, next) {
    if (req.xhr) return next()

    var ext = path.extname(req.path)
    if (ext != '') return next()

    var accept = req.accepts('html', 'json', 'xml')
    if (accept != 'html') return next()

    var stream = fs.createReadStream(pathname)

    function iterator (stream, key) {
      var duplex = replace(key, replacements[key])
      return stream.pipe(duplex)
    }

    var keys = Object.keys(replacements)
    keys.reduce(iterator, stream).pipe(res)
  }

  return middleware
}

function isRelative (pathname) {
  return path.normalize(pathname) != path.resolve(pathname)
}
