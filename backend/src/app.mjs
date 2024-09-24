import express  from 'express'
import cors from 'cors'
import { connectToMongo, deleteAllTasks, findAllTasks, postTask } from './mongo.mjs';

const app = express()
const port = 3000
app.use(cors())
app.use(express.json())
const collection = await connectToMongo("Data", "Data")

app.get('/task', async (req, res) => {
  try {
    const tasks = await findAllTasks(collection)
    res.json(tasks)
  } catch (error) {
    console.error('Error fetching tasks:', error)
    res.status(500).json({ error: 'An error occurred while fetching tasks' })
  }
})

app.post('/post-task', (req, res) => {
  let name = req.body.name
  let description = req.body.description
  let creator = req.body.creator
  const task = {
    name: name,
    description: description,
    creator: creator
  }
  postTask(collection, task)
  res.json({"message" : "ok"})
})

app.delete('/delete', (req, res) => {
  deleteAllTasks(collection)
  res.json({"message" : "delete ok"})
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})