import express from 'express'
import TestPortletServer from "./TestPortletServlet"

const port = process.env.PORT || 8080
const app = express()
const server = new TestPortletServer('portlet1', '../../dist/portlet.js');
server.listen(port)
