const express = require('express')

const routes = express.Router()

const views = __dirname + '/views/'

const profile = {
  name: "Jéferson",
  avatar: "https://github.com/ojeffpinheiro01.png",
  "monthly-budget": 3000,
  "days-per-week": 5,
  "hours-per-day": 5,
  "vacation-per-year": 4,
  "value-hour": 75
}

const Job = {
  data: [
    {
      id: 1,
      name: "Pizzaria Guloso",
      "daily-hours": 2,
      "total-hours": 1,
      created_at: Date.now()
    },
    {
      id: 2,
      name: "OneTwo Project",
      "daily-hours": 3,
      "total-hours": 47,
      created_at: Date.now()
    }
  ],

  controllers: {
    index(req, res) {
      const updateJobs = Job.data.map((job) => {
        const remaining = Job.services.remainingDays(job)
        const status = remaining <= 0 ? 'done' : 'progress'

        return {
          ...job,
          remaining,
          status,
          budget: profile['value-hour'] * job['total-hours']
        }
      })
      res.status(200).render(views + 'index', { jobs: updateJobs })
    },
    create(req, res) {
      return res.status(200).render(views + 'job')
    },
    save(req, res) {
      const lastJobId = Job.data[Job.data.length - 1] ? Job.data[Job.data.length - 1].id : 1
      jobs.push({
        id: lastJobId + 1,
        name: req.body.name,
        "daily-hours": req.body["daily-hours"],
        "total-hours": req.body["total-hours"],
        create_at: Date.now()
      })
      return res.redirect('/')
    }
  },

  services: {
    remainingDays(job) {
      const remainingDays = (job["total-hours"] / job["daily-hours"]).toFixed()

      const createDate = new Date(job.created_at)
      const dueDay = createDate.getDay() + Number(remainingDays)
      const dueDateMS = createDate.setDate(dueDay)

      const timeDiffMS = dueDateMS - Date.now()
      const dayMS = 1000 * 60 * 60 * 24
      const dayDiff = Math.floor(timeDiffMS / dayMS)

      return dayDiff
    }
  }
}

routes.get('/', Job.controllers.index)
routes.get('/job', Job.controllers.create)
routes.post('/job', Job.controllers.save)
routes.get('/job/edit', (req, res) => res.status(200).render(views + 'job-edit'))
routes.get('/profile', (req, res) => {
  res.status(200).render(views + 'profile', { profile })
})

module.exports = routes