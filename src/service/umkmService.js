const { getUmkms, getUmkmByEmail, updateUmkm, createUmkm, deleteUmkm } = require("../repository/umkmRepository")
const { getUserByEmail } = require("../repository/userRepository")
const { bigintToNumber } = require("../utils/function")

const getAllUmkmService = async () => {
    try {
        const umkms = await getUmkms()
        const clearUmkms = bigintToNumber(umkms)
        return clearUmkms
    } catch (error) {
        console.error('Error fetching UMKMs in umkmService:', error)
        throw error
    }
}

const getUmkmByEmailService = async (email) => {
    try {
        const umkm = await getUmkmByEmail(email)
        if (!umkm) {
            const error = new Error(`UMKM with email ${email} not found`)
            error.cause = 'Not Found'
            throw error
        }
        const clearUmkm = bigintToNumber(umkm)
        return clearUmkm
    } catch (error) {
        console.error('Error fetching UMKM by email in umkmService:', error)
        throw error
    }
}

const createUmkmService = async (umkmData, email) => {
    try {
        const {
            name,
            type,
            description,
            location,
            contact,
            logo,
            online_shop,
            media_sosial,
            umkm_galeri
        } = umkmData;
        const { id } = await getUserByEmail(email)
        const prismaData = {
            name,
            type,
            description,
            location,
            contact,
            logo,
            user_id: id,    
            ...(online_shop && online_shop.length > 0 && {
                online_shop: {
                create: online_shop.map(os => ({
                    type: os.type,
                    url: os.url
                }))
                }
            }),
            ...(media_sosial && media_sosial.length > 0 && {
                media_sosial: {
                create: media_sosial.map(ms => ({
                    type: ms.type,
                    url: ms.url
                }))
                }
            }),
            ...(umkm_galeri && umkm_galeri.length > 0 && {
                umkm_galeri: {
                create: umkm_galeri.map(g => ({
                    section: g.section,
                    img_url: g.url      
                }))
                }
            })
            };

        const newUmkm = await createUmkm(prismaData)
        const clearUmkm = bigintToNumber(newUmkm)
        return clearUmkm
    } catch (error) {
        console.error('Error creating UMKM in umkmService:', error)
        throw error
    }
}

const updateUmkmService = async (email, umkmData) => {
    try {
        const { id } = await getUserByEmail(email)
        const {
            name,
            type,
            description,
            location,
            contact,
            logo,
            online_shop,
            media_sosial,
            umkm_galeri
        } = umkmData;
        const prismaData = {
        name,
        type,
        description,
        location,
        contact,
        logo,

        ...(online_shop && {
            online_shop: {
            deleteMany: {}, 
            create: online_shop.map(os => ({
                type: os.type,
                url: os.url
            }))
            }
        }),

        ...(media_sosial && {
            media_sosial: {
            deleteMany: {},
            create: media_sosial.map(ms => ({
                type: ms.type,
                url: ms.url
            }))
            }
        }),

        ...(umkm_galeri && {
            umkm_galeri: {
            deleteMany: {},
            create: umkm_galeri.map(g => ({
                section: g.section,
                img_url: g.url
            }))
            }
        })
        };

        const updatedUmkm = await updateUmkm(id, prismaData)
        const clearUmkm = bigintToNumber(updatedUmkm)
        return clearUmkm
    } catch (error) {
        console.error('Error updating UMKM in umkmService:', error)
        throw error
    }
}

const deleteUmkmService = async (email) => {
    try {
        const {id} = await getUserByEmail(email)
        const deletedUmkm = await deleteUmkm(id)
        const clearUmkm = bigintToNumber(deletedUmkm)
        return clearUmkm
    } catch (error) {
        console.error('Error deleting UMKM in umkmService:', error)
        throw error
    }
}

module.exports = { getAllUmkmService, getUmkmByEmailService, createUmkmService, updateUmkmService, deleteUmkmService }