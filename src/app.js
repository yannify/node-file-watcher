'use strict';
const fs = require('fs');
const path = require('path');
const Watcher = require('./watcher');

const watchDir = path.join(__dirname, '..', 'watchfolder');
const processedDir = path.join(__dirname, '..', 'donefolder');
const watcher = new Watcher(watchDir, processedDir);

watcher.on('process', (file) => {
    const watchFile = `${watchDir}/${file}`;
    const processedFile = `${processedDir}/${file.toLowerCase()}`;
    fs.rename(watchFile, processedFile, err => {
        if (err) throw err;
    });
});

watcher.start();