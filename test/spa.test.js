describe('lib/spa', function () {
  describe('html requests', function () {
    it('should replace values', function (cb) {
      app.get('/')
        .expect(function (res) {
          var html = res.text.trim().split('\n').pop().trim()
          assert.equal('<html>test</html>', html)
        })
        .expect(200, cb)
    })

    it('should render all routes', function (cb) {
      app.get('/any/route?with=params').expect(200, cb)
    })
  })

  describe('json request', function () {
    it('should check xhr', function (cb) {
      app.get('/')
        .set('X-Requested-With', 'XMLHttpRequest')
        .expect(404, cb)
    })

    it('should check content type', function (cb) {
      app.get('/')
        // Accept header value from $.getJSON in Chrome
        .set('Accept', 'application/json, text/javascript, */*; q=0.01')
        .expect(404, cb)
    })
  })

  describe('asset requests', function () {
    it('should check file ext', function (cb) {
      app.get('/assets/app.css').expect(404, cb)
    })
  })
})
