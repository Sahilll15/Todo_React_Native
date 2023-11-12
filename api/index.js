const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()
const todoRoutes = require('./routes/todo.routes')

const app = express()
app.use(cors())

app.use(express.json())

const port = process.env.PORT;
const mongoUrl = process.env.MONGO_URL;


mongoose.connect(mongoUrl)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err))


app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})


app.use('/api/todos', todoRoutes)


