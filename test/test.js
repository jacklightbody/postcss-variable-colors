#!/usr/bin/env node
var plugin = require('../');
console.log(plugin('a { color: rgba(200,200,190,.5); background: #FF0 url(foo.jpg); font-size: 12px; border-top: 1px solid rgba(200,200,190,.5)}'));