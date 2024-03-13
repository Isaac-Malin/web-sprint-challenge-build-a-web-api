// add middlewares here related to actions
const Actions = require('./actions-model')

async function checkActionId(req, res, next) {
  try {
    const action = await Actions.get(req.params.id)
    if (action) {
      req.action = action
      next();
    } else {
      next({ status: 404, message: "No project with given ID"})
    }
  } catch (err) {
    next(err)
  }
}

function checkNewAction(req, res, next) {
  try {
    const { notes, description, project_id } = req.body
    if(notes !== undefined && description !== undefined && project_id !== undefined) {
      next()
    } else {
      res.status(400).json({message: "notes, description, and project_id are required"})
    }
  } catch (err) {
    next(err)
  }
}

function checkUpdatedAction(req, res, next) {
  try {
    const { notes, description, project_id, completed } = req.body
    if(notes !== undefined && description !== undefined && project_id !== undefined && completed !== undefined) {
      next()
    } else {
      res.status(400).json({message: "notes, description, project_id, and completed are required"})
    }
  } catch (err) {
    next(err)
  }
}

module.exports = {
  checkActionId,
  checkNewAction,
  checkUpdatedAction
}