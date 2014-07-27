# express-spa ![](https://travis-ci.org/aj0strow/express-spa.png) ![](https://david-dm.org/aj0strow/express-spa.png)

Static sites are great until you want html5 push state urls. Then they suck because every path besides the index breaks on external entry. 

In case that didn't make any sense imagine the following sequence.

1. User comes to site (`GET /`).
2. User navigates within the page, and the client app silently changes the url to `/some/page`.
3. User loves the page and shares it with a friend.
4. Friend clicks on link (`GET /some/page`). 
5. The friend gets an error (**404**), because the server doesn't know about client-side routing. 

With `express-spa` this is fixed. 

### Example

```javascript
var express = require('express')
var spa = require('express-spa')

var app = express()
app.use(spa())
```

All requests for html regardless of path will stream the index html file. The filepath defaults to `index.html` in the root of the project folder. Absolute paths and paths relative to the project folder are supported. 

```javascript
// project/server/app.js

spa()                           // project/index.html
spa('views/index.html')         // project/views/index.html
spa(__dirname + '/main.html')   // project/server/main.html
```

Rest assured project folder does *not* mean `process.cwd()`. It means project folder.

### Replacements

You can also pass in an object of replacements. This is useful for injecting environment variables into the page, such as firebase urls, api versions, locale, etc. 

```html
<body>
  <script>window.VERSION = '$VERSION';</script>
</body>
```

Be careful to avoid unwanted matches. 

```javascript
spa({ '$VERSION': '1.1' })
```

The streamed markup will have the replacement.

```html
<body>
  <script>window.VERSION = "1.1"</script>
</body>
```

This way you don't need a view rendering engine like jade which can take up to 200ms instead of like 6ms. 

### Notes

Install with npm.

```sh
$ npm install express-spa --save
```

For max performance check out [Divshot](http://www.divshot.com/) to serve static sites off a CDN. 

License: **MIT**
