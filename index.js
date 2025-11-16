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
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    const allowedOrigins = [
      'http://localhost:3000',
      'http://localhost:3001',
      'https://maps.googleapis.com',
      'https://maps.google.com',
      // Allow all Vercel deployments
      /^https:\/\/.*\.vercel\.app$/,
      // Add your specific Vercel frontend URL here
      process.env.FRONTEND_URL
    ].filter(Boolean);
    
    // Check if origin matches any allowed pattern
    const isAllowed = allowedOrigins.some(allowed => {
      if (typeof allowed === 'string') {
        return origin === allowed;
      } else if (allowed instanceof RegExp) {
        return allowed.test(origin);
      }
      return false;
    });
    
    if (isAllowed) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
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