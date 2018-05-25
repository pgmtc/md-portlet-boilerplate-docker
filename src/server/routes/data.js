import express from 'express'

const router = express.Router()

router.get('/', function (req, res, next) {
  res.send('pong')
})

router.get('/:id', function (req, res, next) {
  res.send('pong ' + req.params.id)
})

export default router
