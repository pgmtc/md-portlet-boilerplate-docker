import express from 'express'
import cors from 'cors'
import fs from 'fs'

const port = process.env.PORT || 8080;
const app = express();
app.use(cors());

app.get('/', (req, res) => {
    var contents = fs.readFileSync(__dirname + '/../../dist/portlet.js');
    res.set({
        'Content-Type': 'application/javascript',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true
    });
    res.send((contents || '').toString('utf-8'));
});

app.get('/data', (req, res) => {
    res.send('Hello from server ' + new Date());
});

app.use(express.static('dist'));
app.listen(port);
console.log('Listening on port ' + port);
