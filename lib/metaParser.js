/**
 * //@by_rcmonitor@//
 * on 21.08.2015.
 */

var util = require('util');

var Transform = require('stream').Transform;

util.inherits(MetaParser, Transform);


function MetaParser(){

	Transform.call(this, {objectMode: true});

	this.rOpenTag = /<[^>]*$/;
	this.tagBeginning = '';
}


MetaParser.types = {
	refresh: /<meta http-equiv="refresh" content="(.+)"\/>/
};


MetaParser.prototype._transform = function(chunk, encoding, fCallback){

	var strHtml = chunk.toString();

	if(this.tagBeginning){
		strHtml = this.tagBeginning + strHtml;
	}

	this.parseValue(strHtml);

	var intUnclosedTagPosition = strHtml.search(this.rOpenTag);

	if(intUnclosedTagPosition !== -1){
		this.tagBeginning = strHtml.slice(intUnclosedTagPosition);
	}

	fCallback();
};


MetaParser.prototype._flush = function(fCallback){

	if(this.tagBeginning){

		this.parseValue(this.tagBeginning);
	}

	fCallback();
};


MetaParser.prototype.parseValue = function(strHtml){

	var arMatches = strHtml.match(MetaParser.types.refresh);
	if(arMatches){
		this.push(arMatches[1]);
	}
};


module.exports = MetaParser;