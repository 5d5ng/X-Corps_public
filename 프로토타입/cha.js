document.getElementById('upload')
// .addEventListener('change', readFileAsString)
// function readFileAsString() {
//     var files = this.files;
//     if (files.length === 0) {
//         console.log('No file is selected');
//         return;
//     }

//     var reader = new FileReader();
//     reader.onload = function(event) {
//         console.log('File content:', event.target.result);
//     };
//     reader.readAsText(files[0]);
// }

const fs = require('fs')
fs.readFile('mytext.txt','utf-8',(err,data)=>
{
    if(err) throw err;
    console.log(data);
})
