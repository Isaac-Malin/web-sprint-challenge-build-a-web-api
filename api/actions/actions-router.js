// Write your "actions" router here!
const express = require('express')
const {checkActionId, checkNewAction, checkUpdatedAction} = require('./actions-middlware')
const Actions = require('./actions-model')
const router = express.Router()


router.get('/', (req, res) => {
  Actions.get()
    .then(actions => {
      if (!actions) {
        res.json([])
      }
      res.json(actions)
    })
    .catch(err => {
      res.status(500).json(err)
    })
})

router.get('/:id', checkActionId, (req, res) => {
  Actions.get(req.params.id)
    .then(action => {
      res.status(200).json(action)
    })
})

router.post('/', checkNewAction, (req, res) => {
  Actions.insert(req.body)
    .then((action) => {
      res.status(202).json(action)
    })
})

router.put('/:id', [checkActionId, checkUpdatedAction], (req, res) => {
  Actions.update(req.params.id, req.body)
    .then(action => {
      res.status(202).json(action)
    })
})

router.delete('/:id', checkActionId, (req, res) => {
  Actions.remove(req.params.id)
    .then(action => {
      res.json(action)
    })
})  


module.exports = router