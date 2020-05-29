const express = require('express')
const cookieParser = require("cookie-parser")
const path = require("path");
const cors = require('cors')
const connectDb = require('./core/db')

const app = express()

// connect to the databse
connectDb()

// initialize the body parser
app.use(express.json({extented: false}))

app.use(cors())
app.use(cookieParser())

app.use('/api/users', require('./routes/users'))

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))