const express = require('express');

const renderPage = require('./renderPage')

const app = express();
const port = process.env.PORT || 7777;

app.get('/', function(request, response) {
    renderPage(request, response);
});

app.listen(port, function() {
    console.log('Server listening on http://localhost:' + port);
});
