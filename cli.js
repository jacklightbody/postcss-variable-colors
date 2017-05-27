#!/usr/bin/env node
/*
* @Author: jack
* @Date:   2017-05-19
* @Last Modified by:   Jack Lightbody
* @Last Modified time: 2017-05-27
* Adapted from https://github.com/rsanchez/css-color-extractor-cli
* Usage: postcss-variable-colors input.css output.css -f? 
* -f to force overwrite
*/

var usage = [
    'Usage: css-color-extractor <inputFile?> <outputFile?> [options]',
    '',
    '-f, --overwrite                    Force Overwrite outputFile',
].join('\n');

var argv = require('yargs')
    .usage(usage)
    .argv;

var inputFile = argv._[0] || null;

var outputFile = argv._[1] || null;

var argv = require('yargs')
    .usage(usage)
    .alias('f', 'overwrite')
    .argv;

var options = {
    overwrite: argv.f,
};


var Cli = function(inputFile, outputFile, options){
	var fs = require('fs');
	var emptyInput = new Error('No input file given');
	var events = require('events');
	var eventEmitter = new events.EventEmitter();
	var converter = require('./');
	this.process = function () {
	    if (!process.stdin.isTTY) {
	        processStdin();
	    } else {
	        processInputFile();
	    }
	};
	function emitError(error) {
	    process.nextTick(function () {
	        eventEmitter.emit('error', error);
	    });
	}
	this.onError = function (callback) {
	    eventEmitter.on('error', callback);
	};
	function processStdin() {
	    var data = '';
	    process.stdin.setEncoding('utf8');
	    process.stdin.on('readable', function () {
	        var chunk = process.stdin.read();
	        if (chunk !== null) {
	            data += chunk;
	        }
	    });
	    process.stdin.on('end', function () {
	        if (!data) {
	            emitError(this.emptyInput);
	            return;
	        }
	     	writeAndConvert(data);
	    });
	}
	function processInputFile() {
		// Not sure why this is neccessary
		// But otherwise we get an error for doing readFile on undefined

	    if (!inputFile) {
	        emitError(this.emptyInput);
	        return;
	    }
	    fs.readFile(inputFile, 'utf8', function (err, data) {
	        if (err) {
	            emitError(new Error(err));
	            return;
	        }
	      	writeAndConvert(data);
	    });
	}
	function writeAndConvert(data){
		writeOut(converter.convertFromCss(data));
	}
	function writeOut(output){
		if(typeof options.overwrite === 'undefined' && fs.existsSync(outputFile)){
			emitError(new Error('Output file already exists. Specify -f to force overwrite'));
		}
		if (outputFile) {
            fs.writeFileSync(outputFile, output);
        } else {
            console.log(output);
        }
	}
}
var cli = new Cli(inputFile, outputFile, options);
cli.process();
cli.onError(function (error) {
    if (error === cli.emptyInput) {
        console.log(usage);
    } else {
        console.log(error.message || error);
    }
});
