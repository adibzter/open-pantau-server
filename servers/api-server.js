const path = require('path');
const fs = require('fs');
const https = require('https');

const express = require('express');

const { API_PORT } = require('../config/config');

const createApiServer = () => {
  const app = express();

  // CORS thing
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
  });

  // JSON thing
  app.use(express.json({ limit: '4mb' }));

  // API routes
  app.use('/api/login', require('../api-routes/loginRoute'));
  app.use('/api/playback', require('../api-routes/playbackRoute'));
  app.use('/api/event', require('../api-routes/eventRoute'));
  app.use('/api/notification', require('../api-routes/notificationRoute'));

  // Serve static files
  app.use(express.static('client/build'));

  // Handle URL
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/build/index.html'));
  });

  const options = {
    key: fs.readFileSync('./ssl/key.pem'),
    cert: fs.readFileSync('./ssl/cert.pem'),
  };

  const server = https.createServer(options, app);
  server.listen(API_PORT, () => {
    console.log('Web & API server listening on port:', API_PORT);
  });
};

module.exports = { createApiServer };
