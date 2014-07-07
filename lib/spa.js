var fs = require('fs')
var path = require('path')

var dirname = path.dirname(require.main.filename)
var root = dirname.split('/node_modules/')[0]

// spa('index.html')
// spa('views/layout.html')
// spa(__dirname + '/main.html')
module.exports = spa

function spa (pathname) {
  if (!pathname) pathname = 'index.html'
  if (isRelative(pathname)) {
    pathname = path.join(root, pathname)
  }

  function middleware (req, res, next) {
    if (req.xhr) return next()

    var ext = path.extname(req.path)
    if (ext != '') return next()

    var accept = req.accepts('html', 'json', 'xml')
    if (accept != 'html') return next()

    fs.createReadStream(pathname).pipe(res)
  }

  return middleware
}

function isRelative (pathname) {
  return path.normalize(pathname) != path.resolve(pathname)
}
