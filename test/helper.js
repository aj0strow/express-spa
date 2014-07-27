global.assert = require('assert')

var express = require('express')
var supertest = require('supertest')
var spa = require('..')

var middleware = spa('test/index.html', {
  NODE_ENV: 'test'
})

var app = express()
app.use(middleware)
global.app = supertest(app)
