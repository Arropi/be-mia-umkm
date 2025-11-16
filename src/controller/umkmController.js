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
        const user = req.user; // User from middleware

        // Check if user is admin or creating UMKM for their own email
        if (!['admin_umkm', 'administrator'].includes(user.role) && email !== user.email) {
            return res.status(403).json({
                'message': 'Access denied. You can only create UMKM for yourself.'
            });
        }

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
        const user = req.user; // User from middleware

        // Check if user is admin or trying to update their own UMKM
        if (!['admin_umkm', 'administrator'].includes(user.role) && email !== user.email) {
            return res.status(403).json({
                'message': 'Access denied. You can only update your own UMKM.'
            });
        }

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
        const user = req.user; // User from middleware

        // Check if user is admin or trying to delete their own UMKM
        if (!['admin_umkm', 'administrator'].includes(user.role) && email !== user.email) {
            return res.status(403).json({
                'message': 'Access denied. You can only delete your own UMKM.'
            });
        }

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

const bulkCreateUmkm = async (req, res) => {
    try {
        const umkmArray = req.body.umkms // Expecting { umkms: [...] }
        if (!Array.isArray(umkmArray)) {
            return res.status(400).json({
                'message': 'Request body must contain "umkms" array'
            })
        }

        const { createUmkmService, updateUmkmService, getUmkmByEmailService } = require('../service/umkmService')

        const results = {
            created: [],
            updated: [],
            failed: []
        }

        for (const umkmData of umkmArray) {
            try {
                const { email, ...umkmInfo } = umkmData
                if (!email) {
                    results.failed.push({
                        data: umkmData,
                        error: 'Email is required for each UMKM'
                    })
                    continue
                }

                // Check if UMKM already exists for this email
                let existingUmkm = null
                try {
                    existingUmkm = await getUmkmByEmailService(email)
                } catch (error) {
                    // UMKM doesn't exist, will create new
                }

                if (existingUmkm) {
                    // Update existing UMKM
                    const updatedUmkm = await updateUmkmService(email, umkmInfo)
                    results.updated.push(updatedUmkm)
                } else {
                    // Create new UMKM
                    const newUmkm = await createUmkmService(umkmInfo, email)
                    results.created.push(newUmkm)
                }
            } catch (error) {
                results.failed.push({
                    data: umkmData,
                    error: error.message
                })
            }
        }

        return res.status(200).json({
            'message': 'Bulk upload completed',
            'data': results
        })
    } catch (error) {
        return res.status(500).json({
            'message': 'Internal Server Error',
            'error': error.message
        })
    }
}

module.exports = { getAllUmkm, getDetailUmkmFromEmail, createUmkm, updateUmkm, deleteUmkm, bulkCreateUmkm }