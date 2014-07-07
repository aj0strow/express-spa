# express-spa ![](https://travis-ci.org/aj0strow/express-spa.png) ![](https://david-dm.org/aj0strow/express-spa.png)

Static sites are great until you want html5 push state urls. Then they suck because every path besides the index breaks on external entry. 

```javascript
var express = require('express')
var spa = require('express-spa')

var app = express()
app.use(spa())
```

Now all html requests steam the index html file. The filepath defaults to `index.html` in the root of the project folder. Absolute paths and paths relative to the project folder are supported. 

```javascript
// project/server/app.js

spa()                           // project/index.html
spa('views/index.html')         // project/views/index.html
spa(__dirname + '/main.html')   // project/server/main.html
```

For max performance check out [Divshot](http://www.divshot.com/) to serve static sites off a CDN. 

[![](https://nodei.co/npm/express-spa.png?downloads=true)](https://www.npmjs.org/package/express-spa)

License: **MIT**
