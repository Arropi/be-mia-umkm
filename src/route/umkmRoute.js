const express = require('express')
const { getAllUmkm, getDetailUmkmFromEmail, createUmkm, updateUmkm, deleteUmkm } = require('../controller/umkmController')
const route = express.Router()

route.get('/', getAllUmkm)
route.get('/detail', getDetailUmkmFromEmail)
route.post('/', createUmkm)
route.put('/', updateUmkm)
route.delete('/', deleteUmkm)

module.exports = route