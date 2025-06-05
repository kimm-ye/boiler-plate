const express = require('express')
const app = express()
const port = 5000

const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://user1:QNBqIR7DfKO9qf7a@cluster-test-001.ccvm1ue.mongodb.net/?retryWrites=true&w=majority&appName=Cluster-Test-001')
.then(() => console.log('MongoDB Connected...'))
.catch(err => console.log(err))

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
