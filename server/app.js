const dotenv = require('dotenv')
dotenv.config()
const express = require('express')
const app = express()
require('./config/db')
const cookieParser = require('cookie-parser')
const cors = require('cors')

app.use(cors({
    origin: ['http://localhost:3000'],
    credentials: true
}))

app.use(cookieParser())

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Auth Route
app.use('/api', require('./routes/auth'))

// Private Route
app.use('/api', require('./routes/private'))

const PORT = process.env.PORT || 7000

app.listen(PORT, () => {
    console.log(`Server is Running at PORT: ${PORT}`)
})