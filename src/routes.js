const express = require('express')

const routes = express.Router()

const views = __dirname + '/views/'

const profile = {
  name: "Jéferson",
  avatar: "https://avatars.githubusercontent.com/u/60162736?v=4",
  "monthly-budget": 3000,
  "days-per-week": 5,
  "hours-per-day": 5,
  "vacation-per-year": 4
}

routes.get('/', (req, res) => res.status(200).render(views + 'index'))
routes.get('/job', (req, res) => res.status(200).render(views + 'job'))
routes.get('/job/edit', (req, res) => res.status(200).render(views + 'job-edit'))
routes.get('/profile', (req, res) => {
 res.status(200).render(views + 'profile', { profile })
})

module.exports = routes