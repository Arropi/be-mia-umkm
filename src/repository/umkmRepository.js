const prisma = require('../config/dbConfig')

const getUmkmByEmail = async (email) => {
    try {
        const umkm = await prisma.umkm.findUnique({
            where: { email: email },
            include: {
                umkm_galeri: true,
                user: true,
                online_shop: true,
                media_sosial: true
            }
        })
        return umkm
    } catch (error) {
        console.error('Error fetching UMKM by email:', error)
        throw error
    }
}

const getUmkms = async () => {
    try {
        const umkms = await prisma.umkm.findMany({
            include: {
                umkm_galeri: true,
                user: true,
                online_shop: true,
                media_sosial: true
            }
        })
        return umkms
    } catch (error) {
        console.error('Error fetching UMKMs:', error)
        throw error
    }
}

const createUmkm = async (umkmData) => {
    try {
        const newUmkm = await prisma.umkm.create({
            data: umkmData
        })
        return newUmkm
    } catch (error) {
        console.error('Error creating UMKM:', error)
        throw error
    }
}

const updateUmkm = async (id, umkmData) => {
    try {
        const updatedUmkm = await prisma.umkm.update({
            where: { id: id },
            data: umkmData
        })
        return updatedUmkm
    } catch (error) {
        console.error('Error updating UMKM:', error)
        throw error
    }
}

const deleteUmkm = async (id) => {
    try {
        const deletedUmkm = await prisma.umkm.delete({
            where: { id: id }
        })
        return deletedUmkm
    } catch (error) {
        console.error('Error deleting UMKM:', error)
        throw error
    }
}

module.exports = { getUmkmByEmail, getUmkms, createUmkm, updateUmkm, deleteUmkm }