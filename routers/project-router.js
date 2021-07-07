const express = require('express')
const projects = require('../data/helpers/projectModel')
const router = express.Router();

router.get('/', (req, res) => {
    projects.get()
    .then(project => {
        console.log('project success')
        res.status(200).json(project)
    })
    .catch(error => {
        res.status(500).json({message: 'Error retrieving projects'})
    })
})

router.get('/:id', (req, res) => {
    const id = req.params.id;
    projects.get(id)
    .then(project => {
        res.status(200).json(project)
    })
    .catch(error => {
        res.status(500).json({message: "Error finding project"})
    })
})

router.get('/:id/actions', (req, res) => {
    const id = req.params.id;
    projects.getProjectActions(id)
    .then(action => {
        res.status(200).json(action)
    })
    .catch(error => {
        res.status(500).json({message: "Error finding actions"})
    })
})

router.post('/', validateProject, (req, res) => {
    const thisProject = req.body
    projects.insert(thisProject)
    .then(item => {
        res.status(201).json({item: thisProject})
    })
    .catch(error => {
        console.log(error)
        res.status(500).json({message: 'Error adding project'})
    })
})

router.put('/:id', validateProject, (req, res) => {
    const newProject = req.body;
    const id = req.params.id;
    projects.update(id, newProject)
    .then(item => {
        res.status(200).json(item)
    })
    .catch(error => {
        res.status(500).json({message: 'Error updating project'})
    })
})

router.delete('/:id', (req, res) => {
    const id = req.params.id;
    projects.remove(id)
    .then(project => {
        res.status(200).json(project)
    })
    .catch(error => {
        res.status(500).json({message: 'Error removing project'})
    })
})

function validateProject(req, res, next){
    const body = req.body;
    const name = req.body.name;
    const description = req.body.description;
    if(!body || !name || !description){
        res.status(400).json({message: 'Missing some crucial data'})
    }else{
        next()
    }
}

module.exports = router