require('dotenv').config()
const express = require('express')
const cors = require('cors')
const app = express()
const port = process.env.PORT
const authRoute = require('./src/route/authRoute')
const userRoute = require('./src/route/userRoute')
const umkmRoute = require('./src/route/umkmRoute')
const uploadRoute = require('./src/route/uploadRoute')

app.use(express.json())

// CORS configuration
const corsOptions = {
  origin: [
    'http://localhost:3000',
    'http://localhost:3001',
    'https://maps.googleapis.com',
    'https://maps.google.com'
  ],
  credentials: true,
  optionsSuccessStatus: 200
}
app.use(cors(corsOptions))

app.get('/', (req, res) => {
    res.json({
        'message': 'Hello world!!'
    })
})

app.use('/auth', authRoute)
app.use('/user', userRoute)
app.use('/api/umkm', umkmRoute)
app.use('/upload', uploadRoute)

app.listen(port, ()=> {
    console.log(`App listen on http://localhost:${port}`)
})