/**
 * //@by_rcmonitor@//
 * on 21.08.2015.
 */

var Stream = require('stream');
require('chai').should();

var Parser = require('../index');

describe('html meta parser test', function(){

	describe('parser', function(){

		var testParser = function(oParser, arExpected, fCallback){
			var intOffset = 0;

			oParser.on('readable', function(){
				var data = oParser.read();

				data.should.eql(arExpected[intOffset]);

				intOffset ++;
			});

			oParser.on('end', function(){
				fCallback();
			})
		};


		it('should successfully parse refresh meta', function(fCallback){
			var strTag = '<meta http-equiv="refresh" content="some super string"/>';
			var arExpected = ['some super string'];

			var sString = new Stream.Readable();
			sString._read = function noop(){};

			var oParser = new Parser();

			sString.pipe(oParser);

			sString.push(strTag);
			sString.push(null);

			testParser(oParser, arExpected, fCallback);
		});


		it('should detect unclosed tag', function(fCallback){
			var strFirst = 'any crap goes here <meta http-equiv="refresh"';
			var strSecond = ' content="some moar complex string"/>';
			var arExpected = ['some moar complex string'];

			var sString = new Stream.Readable();
			sString._read = function noop(){};

			var oParser = new Parser();

			sString.pipe(oParser);

			sString.push(strFirst);
			sString.push(strSecond);
			sString.push(null);

			testParser(oParser, arExpected, fCallback);

		});
	})
});