// Write your "projects" router here!
const express = require('express')
const {checkProjectId, checkNewProject, checkUpdatedProject} = require('./projects-middleware')
const Project = require('./projects-model')

const router = express.Router()

router.get('/', (req, res) => {
  Project.get()
    .then(projects => {
      // Check if projects array is empty
      if (projects.length === 0) {
        res.status(200).json([]); // Respond with an empty array
      } else {
        res.status(200).json(projects); // Respond with the projects array
      }
    })
    .catch(err => {
      res.status(500).json(err); // Respond with an error
    });
});

router.get('/:id', checkProjectId, (req, res, next) => {
  const { id } = req.params;
  Project.get(id)
    .then(project => {
      res.status(200).json(project);
    })
    .catch(err => {
      // If there's an error, respond with a 500 Internal Server Error status
      next(err)
    });
});

router.post('/', checkNewProject, (req, res) => {
  Project.insert(req.body)
    .then((project) => {
      res.status(202).json(project)
    })
})

router.put('/:id', [checkProjectId, checkUpdatedProject], (req, res) => {
  const { id } = req.params
  Project.update(id, req.body)
    .then(project => {
      res.status(201).json(project)
    })
})

router.delete('/:id', checkProjectId, (req, res) => {
  const { id } = req.params
  Project.remove(id)
    .then(project => {
      res.status(200).json(project)
    })
})

router.get('/:id/actions', checkProjectId, (req, res) => {
  const { id } = req.params
  Project.getProjectActions(id)
    .then(project => {
      res.status(200).json(project)
    })
})


module.exports = router