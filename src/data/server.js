import express from 'express'
import cors from 'cors'
import routes from './routes/index'

const port = process.env.PORT || 8080
const app = express()

app.use(cors())
app.use('/', routes)
app.use(express.static('dist'))
app.listen(port)
console.log('Listening on port ' + port)
