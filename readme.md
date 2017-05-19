# Postcss Variable Colors
This is a simple node package to support converting colors into the css custom attribute detailed [here](https://developers.google.com/web/updates/2016/02/css-variables-why-should-you-care).
## Installation
	npm install postcss-variable-colors
	
## Usage
	var converter = require('postcss-variable-colors');
	var convertedCss = converter('a { color: #fff; background: red url(foo.jpg); font-size: 12px; border-top: 1px solid red}'
