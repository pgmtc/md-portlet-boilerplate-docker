import express from 'express'

const router = express.Router()

router.get('/', function (req, res, next) {
  res.send('pong')
})

router.get('/:methodName/:methodParams', (req, res, next) => {
  var methodName = req.params.methodName;
  var methodParams = parseParameters(req.params.methodParams);


  res.send('Pingy pong: ' + methodParams);
})

router.get('/:id', function (req, res, next) {
  res.send('pong ' + req.params.id)
})

export default router

function parseParameters(parameters) {
  let parsed = decodeURIComponent(parameters);
  try {
    parsed = JSON.parse(parsed);
  } catch (err) {

  }
  return parsed
}
