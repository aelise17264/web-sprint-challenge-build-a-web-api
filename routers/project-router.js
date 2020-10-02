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

router.post('/', (req, res) => {
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

module.exports = router