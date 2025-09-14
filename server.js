require('newrelic'); // MUST be first

const express = require('express');
const { Server, FileStore } = require('tus-node-server');
const fs = require('fs');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// Make upload folder configurable (use Render disk mount or fallback)
const uploadsPath = process.env.TUS_DATA_DIR || path.join(__dirname, 'files');
fs.mkdirSync(uploadsPath, { recursive: true });

// Setup tus server
const tusServer = new Server({
    datastore: new FileStore({
    path: uploadsPath
    })
});

// Attach the tus server
app.all('/uploads/*', (req, res) => {
  tusServer.handle(req, res);
});

// Health check
app.get('/health', (req, res) => res.json({ status: 'ok' }));

app.listen(port, () => {
  console.log(`🚀 tus-node-server running on port ${port}, uploadsPath=${uploadsPath}`);
});
