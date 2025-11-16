const { getUmkms, getUmkmByEmail, updateUmkm, createUmkm, deleteUmkm } = require("../repository/umkmRepository")
const { getUserByEmail } = require("../repository/userRepository")
const { bigintToNumber } = require("../utils/function")

// Helper function to normalize online shop type
const normalizeOnlineShopType = (type) => {
    if (!type) return type;
    const typeMap = {
        'gojek': 'GoJek',
        'go-jek': 'GoJek',
        'blibli': 'Blibli',
        'tokopedia': 'Tokopedia',
        'shopee': 'Shopee',
        'lazada': 'Lazada'
    };
    return typeMap[type.toLowerCase()] || type;
};

// Helper function to normalize media sosial type
const normalizeMediaSosialType = (type) => {
    if (!type) return type;
    const typeMap = {
        'x': 'X',
        'twitter': 'X',
        'instagram': 'Instagram',
        'facebook': 'Facebook',
        'tiktok': 'TikTok'
    };
    return typeMap[type.toLowerCase()] || type;
};

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
        const { id } = await getUserByEmail(email)
        if (!id) {
            throw Error("User Not Found", {
                cause: "Not Found"
            })
        }
        const {
            name,
            type,
            description,
            location,
            contact,
            logo,
            online_shop,
            media_sosial,
            umkm_galeri,
            gmaps
        } = umkmData;
        const prismaData = {
            name,
            type,
            description,
            location,
            contact,
            logo,
            gmaps,
            user_id: id,    
            ...(online_shop && online_shop.length > 0 && {
                online_shop: {
                create: online_shop.map(os => ({
                    type: normalizeOnlineShopType(os.type),
                    url: os.url
                }))
                }
            }),
            ...(media_sosial && media_sosial.length > 0 && {
                media_sosial: {
                create: media_sosial.map(ms => ({
                    type: normalizeMediaSosialType(ms.type),
                    url: ms.url
                }))
                }
            }),
            ...(umkm_galeri && umkm_galeri.length > 0 && {
                umkm_galeri: {
                create: umkm_galeri
                    .filter(g => g.img_url && typeof g.img_url === 'string' && g.img_url.trim() !== '') // More specific validation
                    .map(g => ({
                        section: g.section || 'Default Section', // Ensure section has a value
                        img_url: g.img_url.trim()
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
        // First, get the UMKM by email to find its ID
        const existingUmkm = await getUmkmByEmail(email)
        if (!existingUmkm) {
            throw Error("UMKM Not Found", {
                cause: "Not Found"
            })
        }

        const {
            name,
            type,
            description,
            gmaps,
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
        gmaps,

        ...(online_shop && {
            online_shop: {
            deleteMany: {},
            create: online_shop.map(os => ({
                type: normalizeOnlineShopType(os.type),
                url: os.url
            }))
            }
        }),

        ...(media_sosial && {
            media_sosial: {
            deleteMany: {},
            create: media_sosial.map(ms => ({
                type: normalizeMediaSosialType(ms.type),
                url: ms.url
            }))
            }
        }),

        ...(umkm_galeri !== undefined && {
            umkm_galeri: {
                deleteMany: {},
                create: umkm_galeri
                    .filter(g => g.img_url && typeof g.img_url === 'string' && g.img_url.trim() !== '') // More specific validation
                    .map(g => ({
                        section: g.section || 'Default Section', // Ensure section has a value
                        img_url: g.img_url.trim()
                    }))
            }
        })
        };

        const updatedUmkm = await updateUmkm(existingUmkm.id, prismaData)
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
        if (!id) {
            throw Error("User Not Found", {
                cause: "Not Found"
            })
        }
        const deletedUmkm = await deleteUmkm(id)
        const clearUmkm = bigintToNumber(deletedUmkm)
        return clearUmkm
    } catch (error) {
        console.error('Error deleting UMKM in umkmService:', error)
        throw error
    }
}

module.exports = { getAllUmkmService, getUmkmByEmailService, createUmkmService, updateUmkmService, deleteUmkmService }