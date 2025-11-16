const express = require('express')
const { authenticateToken, authorizeAdmin, authorizeAdminUmkm } = require('../middleware/auth')
const { getAllUmkm, getDetailUmkmFromEmail, createUmkm, updateUmkm, deleteUmkm, bulkCreateUmkm } = require('../controller/umkmController')
const route = express.Router()

// Public route - no authentication required
route.get('/', getAllUmkm)

// Protected routes - require authentication
route.get('/detail', authenticateToken, getDetailUmkmFromEmail)
route.post('/', authenticateToken, authorizeAdminUmkm, createUmkm)
route.post('/bulk', authenticateToken, authorizeAdmin, bulkCreateUmkm)
route.put('/', authenticateToken, authorizeAdminUmkm, updateUmkm)
route.delete('/', authenticateToken, authorizeAdminUmkm, deleteUmkm)

module.exports = route