const fs = require('fs');
const htmlparser2 = require("htmlparser2");

function renderPage(request, response) {
    fs.readFile('index.html', 'utf8', (err,html)=>{
        if(err){
           throw err;
        }
     
        const root = htmlparser2.parseDocument(html);
     
        const head = root.querySelector('head');
        head.appendChild('<title>Stuff here</title>');
        const body = root.querySelector('body');
        body.appendChild('<div id="content">Hello World !</div>');
     
        response.send(root);
      });
}
