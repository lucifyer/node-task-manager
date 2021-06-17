const express = require('express')
const Task = require('../models/task')
const auth = require('../middleware/auth')
const router = new express.Router()

router.post('/tasks', auth, async (req, res) => {
    const task = new Task({
        ...req.body,
        author: req.user._id
    })
    try {
        await task.save()
        res.status(201).send(task)
    } catch (error) {
        res.status(400).send(error)
    }
})

// PARAMS
// completed (Boolean)
// limit (Integer)
// skip (Integer)
// sortBy (String) field_order
// e.g: createdAt_desc, completed_asc
router.get('/tasks', auth, async (req,res) => {
    try {
        const match = {}
        if (req.query.completed) {
            // params come as string, hence conversion
            match.completed = req.query.completed === 'true'
        }
        const sort = {}
        if (req.query.sortBy) {
            const parts = req.query.sortBy.split('_')
            // 1 is ASC, -1 is DESC
            sort[parts[0]] = parts[1] === 'asc' ? 1 : -1
        }
        // this uses the foreign key reference to populate the task array from task collection
        await req.user.populate({
            path: 'tasks',
            match,
            options: {
                limit: parseInt(req.query.limit),
                skip: parseInt(req.query.skip),
                sort,
            }
        }).execPopulate()
        res.send(req.user.tasks)
    } catch (error) {
        res.status(500).send(error)
    }
})

router.get('/tasks/:id', auth, async (req, res) => {
    const _id = req.params.id
    try {
        const task = await Task.findOne({ _id, author: req.user._id })
        if (!task) {
            return res.status(404).send()
        }
        res.send(task)
    } catch (error) {
        res.status(500).send(error)
    }
})

router.patch('/tasks/:id', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdate = ['description', 'priority', 'completed']
    const isValidOperation = updates.every((update) => allowedUpdate.includes(update))

    if(!isValidOperation) {
        return res.status(400).send({error: 'Invalid operation'})
    }
    try {
        const task = await Task.findOne({ _id: req.params.id, author: req.user._id })
        if(!task) {
            return res.status(404).send()
        }
        updates.forEach((update) => task[update] = req.body[update])
        await task.save()
        res.send(task)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.delete('/tasks/:id', auth,  async (req, res) => {
    try {
        const task = await Task.findOneAndDelete({ _id: req.params.id, author: req.user._id })
        if(!task) {
            return res.status(404).send()
        }
        res.send(task)
    } catch (error) {
        res.status(400).send(error)
    }
})

module.exports = router