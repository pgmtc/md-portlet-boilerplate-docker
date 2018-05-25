import express from 'express'
import cors from 'cors'
import log from './logger'
import routes from './routes/index'
import MdPortletServer from "./MdPortletServer"

const port = process.env.PORT || 8080
const app = express()

global.md = new MdPortletServer('portlet1');

// Cleanup on exit
process.on('SIGINT', ::global.md.destructor);
process.on('SIGUSR1', ::global.md.destructor);
process.on('SIGUSR2', ::global.md.destructor);
process.on('uncaughtException', ::global.md.destructor);

// Start server
app.use(cors())
app.use('/', routes)
app.use(express.static('dist'))
app.listen(port, (err) => {
  if (err) {
    log.error('Error when starting server: ' + err.message);
    return;
  }
  log.info('Server listening on port ' + port);
})
