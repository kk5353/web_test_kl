const express = require('express');
const history = require('connect-history-api-fallback');
var server = express();
server.listen(808);
console.log('http://127.0.0.1:808'  );
server.use('/',express.static('static'));



