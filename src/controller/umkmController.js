const { getAllUmkmService, getUmkmByEmailService, createUmkmService, updateUmkmService, deleteUmkmService } = require('../service/umkmService')
const getAllUmkm = async (req, res) => {
    try {
        const umkms = await getAllUmkmService()
        return res.status(200).json({
            'message': 'Getting all UMKM succesfully',
            'data': umkms
        })
    } catch (error) {
        return res.status(500).json({
            'message': 'Internal Server Error'
        })
    }
}

const getDetailUmkmFromEmail = async (req, res) => {
    try {
        const email = req.query.email
        const umkm = await getUmkmByEmailService(email)
        return res.status(200).json({
            'message': 'Getting UMKM detail succesfully',
            'data': umkm
        })
    } catch (error) {
        if (error.cause == 'Not Found') {
            return res.status(404).json({
                'message': error.message
            })
        } else {
            return res.status(500).json({
                'message': 'Internal Server Error'
            })
        }
    }
}

const createUmkm = async (req, res) => {
    try {
        const umkmData = req.body
        const email = req.query.email
        const newUmkm = await createUmkmService(umkmData, email)
        return res.status(201).json({
            'message': 'UMKM created successfully',
            'data': newUmkm
        })
    } catch (error) {
        return res.status(500).json({
            'message': 'Internal Server Error'
        })
    }
}

const updateUmkm = async (req, res) => {
    try {
        const email = req.query.email
        const umkmData = req.body
        const updatedUmkm = await updateUmkmService(email, umkmData)
        return res.status(200).json({
            'message': 'UMKM updated successfully',
            'data': updatedUmkm
        })
    } catch (error) {
        if (error.cause == 'Not Found') {
            return res.status(404).json({
                'message': error.message
            })
        } else {
            return res.status(500).json({
                'message': 'Internal Server Error'
            })
        }
    }
}

const deleteUmkm = async (req, res) => {
    try {
        const email = req.query.email
        const deletedUmkm = await deleteUmkmService(email)
        return res.status(200).json({
            'message': 'UMKM deleted successfully',
            'data': deletedUmkm
        })
    } catch (error) {
        if (error.cause == 'Not Found') {
            return res.status(404).json({
                'message': error.message
            })
        } else {
            return res.status(500).json({
                'message': 'Internal Server Error'
            })
        }
    }
}

module.exports = { getAllUmkm, getDetailUmkmFromEmail, createUmkm, updateUmkm, deleteUmkm }