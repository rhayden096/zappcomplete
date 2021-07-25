const express = require('express')
const knex = require('knex')(require('./knexfile.js')['production'])
const app = express()
const port = process.env.PORT || 3001
// const db = require('./db')
const cors = require('cors')
require('dotenv').config()

// SERVER
app.listen(port, () => {
  console.log(`Listening, localhost:${port}`)
})

// Middleware
app.use(cors({ origin: 'https://z-app-frontend.herokuapp.com', credentials: true }))
// app.use(cors({ origin: 'http://localhost:3000', credentials: true }))
app.use(express.json())

// Routes
app.get('/', (req, res) => {
  res.send('heroku test server successful')

})

app.post('/checkTask', async (req, res) => {
  let task = req.body.title


  knex
    .select('*')
    .from('tasks')
    .where({ title: `${task}` })
    .then(result => {
      if (result.length === 0) {
        res.send('task created')
      } else if (result[0].title === task) {
        res.send('task already exists')
      }
    }
    )
    // .then(data => res.status(200).json(data))
    .catch(err => res.status(404).json({ message: 'these are not the users you are looking for' }))

  // {username: 'username', password: 'password'}

  console.log(`title ${task}  result: $ ${result[0].description} `)


})

// this is my read
app.get('/test', (req, res) => {
  console.log('request records')
  knex
    .select('*')
    .from('tasks')
    .orderBy('id')
    .then(data => res.status(200).json(data))
    .catch(err => {
      res.status(404).json({
        message: 'not found'
      })
    })
})
// this is my create
app.post('/newtask', (req, res) => {
  knex
    .select('*')
    .from('tasks')
    .where({ title: `${req.body.title}` })
    .then(result => {
      if (result.length >= 0) {
        knex.insert({
          title: req.body.title,
          description: req.body.description,
        }).into('tasks')
          .then(res.send({ message: 'successfully added new task in view tasks!' }))

      } else {
        res.send({ message: 'task Already Exists' })
      }

    }
    )
    .catch(err => res.send({ message: 'error when trying to add task' }))

})
//this is my delete
app.delete('/delete', (req, res) => {
  console.log('user tried to delete', req.body.title)
  knex('tasks')
    .del()
    .where({ title: req.body.title })
    .then(data => res.status(200).json(data))
    .catch(err => {
      res.status(404).json({
        message: 'not found'
      })
    })
})
//this is my update
app.put('/update', (req, res) => {
  console.log(req.body)
  knex('tasks')
    .where({ title: req.body.title })
    .update({ title: req.body.newtask })
    .update({ description: req.body.newdescription })
    .then(res.send({ message: 'task updated' }))
    .catch(err => res.send({ message: 'error when updating task' }))
})