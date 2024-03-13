// add middlewares here related to projects
const Project = require('./projects-model')

async function checkProjectId(req, res, next) {
  try {
    const project = await Project.get(req.params.id)
    if (project) {
      req.project = project
      next();
    } else {
      next({ status: 404, message: "No project with given ID"})
    }
  } catch (err) {
    next(err)
  }
}

function checkNewProject(req, res, next) {
  try {
    const { name, description } = req.body
    if(name !== undefined && description !== undefined) {
      next()
    } else {
      res.status(400).json({message: "name and description are required"})
    }
  } catch (err) {
    next(err)
  }
}

function checkUpdatedProject(req, res, next) {
  try {
    const { name, description, completed } = req.body
    if(name !== undefined && description !== undefined && completed !== undefined) {
      next()
    } else {
      res.status(400).json({message: "name, description, and completed are required"})
    }
  } catch (err) {
    next(err)
  }
}

module.exports = {
  checkProjectId,
  checkNewProject,
  checkUpdatedProject
}