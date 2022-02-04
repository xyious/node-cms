const express = require('express');
const { Pool } = require('pg');

const renderPage = require('./renderPage')
const InstallDB = require('./InstallDB')

const app = express();
const port = process.env.PORT || 7777;

const pool = new Pool({
    user: process.env.POSTGRESUSER,
    host: 'localhost',
    password: process.env.POSTGRESPW,
    port: 5432,
  });
  

app.get('/InstallDB', function(request, response) {
    InstallDB(request, response, pool);
});

app.get('/', function(request, response) {
    renderPage(request, response);
});

app.use(express.static('public'));

app.listen(port, function() {
    console.log('Server listening on http://localhost:' + port);
});
