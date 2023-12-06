const express = require('express')
const cors = require('cors')
const { pathLogger } = require('./middleware/logger')
const router = require('./router')
const cron = require('node-cron')
const { updateCache } = require('./service/waveData')

const bouyIdArr = [44008, 41002, 41013, 41004, 41008, 41009, 41047, 41046, 46053, 46086]

const app = express()

app.use(cors());
app.use(express.json())
app.use(pathLogger)

router(app)

app.get('/message', (_req, res) => {
  res.json({ message: `The SurfLog back end server is running and it is ${time} local time. ` })
})

app.listen(8000, () => {
  console.log(`Server is running on port 8000.`)
})

cron.schedule('1 0 * * *', () => {
  console.log('starting cache')
  updateCache(bouyIdArr)
})

