require('dotenv').config()
const express = require('express')
const cors = require('cors')
const app = express()
const port = process.env.PORT
const authRoute = require('./src/route/authRoute')
const userRoute = require('./src/route/userRoute')
const umkmRoute = require('./src/route/umkmRoute')

app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
    res.json({
        'message': 'Hello world!!'
    })
})

app.use('/auth', authRoute)
app.use('/user', userRoute)
app.use('/api/umkm', umkmRoute)

app.listen(port, ()=> {
    console.log(`App listen on http://localhost:${port}`)
})