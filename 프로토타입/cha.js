var fs = require('fs');
var text = fs.readFileSync('mytext.txt','utf8');
console.log(text);


fs.readFile('mytext.txt', 'utf8', function(err, data) {
    console.log(data);
});