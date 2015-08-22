html-meta-parser
================

html metadata parser; simple and stream-based
For now, retrieves 'content' attribute of http-equiv="refresh"
More patterns should be added

## Installation

```
npm install html-meta-parser -save
```

## Usage:
```js
var fs = require('fs');
var Parser = require('html-meta-parser');

var sHtml = fs.createReadStream('path/to/file.html');
var oParser = new Parser();
sHtml.pipe(oParser);

oParser.on('readable', function(){
	var oData = this.read();
	console.log(oData);
});
```