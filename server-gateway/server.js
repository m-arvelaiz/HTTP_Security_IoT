const fs = require('fs');
const https = require('https');
const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');

const app = express();
app.use(bodyParser.json());

// HTTP Route
app.post('/data', (req, res) => {
  console.log('Received Data (HTTP):', req.body);
  res.json({ message: 'Data received over HTTP', data: req.body });
});

// HTTPS Route
app.post('/secure-data', (req, res) => {
  console.log('Received Data (HTTPS):', req.body);
  res.json({ message: 'Data received securely over HTTPS', data: req.body });
});

// HTTP Server setup
http.createServer(app).listen(3000, () => {
  console.log('HTTP server running at http://localhost:3000');
});

// HTTPS Server setup with weak protocols enabled (TLSv1, TLSv1.1)
const sslOptions = {
  key: fs.readFileSync('./ssl/server.key'),
  cert: fs.readFileSync('./ssl/server.cert'),
  secureProtocol: 'TLS_method', // Accepts all supported protocols (including weaker ones)
  ciphers: 'ALL',  // Accept all ciphers, including weak ones (use with caution)
  honorCipherOrder: true,  // Use the server's preferred cipher order
  secureOptions: [
    'TLSv1_method',  // Allows SSLv3, TLSv1, TLSv1.1
    'TLSv1_1_method',
    'TLSv1_2_method',  // Retaining TLSv1.2 support
    'TLSv1_3_method'   // Retaining TLSv1.3 support
  ],
};

https.createServer(sslOptions, app).listen(3443, () => {
  console.log('HTTPS server running at https://localhost:3443');
});

  