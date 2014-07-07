global.assert = require('assert')

var express = require('express')
var supertest = require('supertest')
var spa = require('..')

var app = express()
app.use(spa('test/index.html'))
global.app = supertest(app)
