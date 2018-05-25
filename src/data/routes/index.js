import express from 'express'
import ping from './ping'

var path = require('path');
var appDir = path.dirname(require.main.filename);

const router = express.Router();

// Default route
router.get('/', function(req, res, next) {
    res.sendFile(path.join(appDir, '../../dist/portlet.js'));
})

// Add sub routes
router.use('/ping', ping);

export default router
