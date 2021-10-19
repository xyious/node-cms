const fs = require('fs');
const parse = require('node-html-parser').parse;

function renderPage(request, response) {
    fs.readFile('./template.html', 'utf8', (err,html)=>{
        if(err){
           throw err;
        }
     
        const root = parse(html);
     
        const head = root.querySelector('head');
        let node = parse('<title>Stuff here</title>')
        head.appendChild(node);
        const body = root.querySelector('body');
        node = parse('<div id="content">Hello World !</div>')
        body.appendChild(node);
     
        response.send(root.toString());
      });
}

module.exports = renderPage;