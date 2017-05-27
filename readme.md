# Postcss Variable Colors
This is a simple node package to support converting colors into the css custom attribute detailed [here](https://developers.google.com/web/updates/2016/02/css-variables-why-should-you-care).
## Installation
	npm install postcss-variable-colors
	
## Usage
	var converter = require('postcss-variable-colors');
	var convertedCss = converter.convertFromCss('a { color: #fff; background: red url(foo.jpg); font-size: 12px; border-top: 1px solid red}')
	
	
## Command Line Usage
	variable-colors input.css? output.css? -f?

Specify the `f` tag to force overwrite the output css file. 

You can also pipe in with

	cat input.css | variable-colors 
	
## Todo
- Add tests for cli module