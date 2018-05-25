import express from 'express'
import ping from './data'

var path = require('path')
var appDir = path.dirname(require.main.filename)

const router = express.Router()

// Default route
router.get('/', function (req, res, next) {
  res.sendFile(path.join(appDir, '../../dist/portlet.js'))
})

// Add sub routes
router.use('/data', ping)

export default router
