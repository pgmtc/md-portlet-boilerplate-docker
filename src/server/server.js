import express from 'express'
import TestPortletServer from "./TestPortletServlet"

const port = process.env.PORT || 8080
const app = express()
const server = new TestPortletServer('../../dist/portlet.js');
process.on('uncaughtException', (err) => {
  console.error(err)
})

server.listen(port)

