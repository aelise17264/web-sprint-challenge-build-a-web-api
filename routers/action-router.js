const express = require('express')
const actions = require('../data/helpers/actionModel')
const router = express.Router();

router.get('/', (req, res) => {
    actions.get()
    .then(action => {
        console.log('action success')
        res.status(200).json(action)
    })
    .catch(error => {
        res.status(500).json({message: 'Error retrieving actions'})
    })
})

router.get('/:id', (req, res) => {
    const id = req.params.id;
    actions.get(id)
    .then(action => {
        res.status(200).json(action)
    })
    .catch(error => {
        res.status(500).json({message: "Error finding action"})
    })
})

router.post('/', validateAction, (req, res) => {
    // const projectId = req.body.project_id
    const thisAction = req.body;
    actions.insert(thisAction)
    .then(item => {
        res.status(201).json({item: thisAction})
    })
    .catch(error => {
        console.log(error)
        res.status(500).json({message: 'Error adding project'})
    })
})

router.put('/:id', validateAction, (req, res) => {
    const newAction = req.body;
    const id = req.params.id;
    actions.update(id, newAction)
    .then(item => {
        res.status(200).json(item)
    })
    .catch(error => {
        res.status(500).json({message: 'Error updating action'})
    })
})

router.delete('/:id', (req, res) => {
    const id = req.params.id;
    actions.remove(id)
    .then(action => {
        res.status(200).json(action)
    })
    .catch(error => {
        res.status(500).json({message: 'Error removing project'})
    })
})

function validateAction(req, res, next){
    const body = req.body;
    const notes = req.body.notes;
    const description = req.body.description;
    const projectId = req.body.project_id;
    if(!projectId || !notes || !description){
        res.status(400).json({message: 'Missing some crucial data'})
    }else{
        next()
    }
}

module.exports = router