const { UmkmType, MediaSosialType, OnlineShopType } = require('@prisma/client');
const { z, ZodError } = require('zod');

const umkmValidation = async (req, res, next) => {
    try {
        const objectSchemaSocialMedia = z.object({
            type: z.enum(MediaSosialType, {
                error: (iss) =>
                    iss.input === undefined
                        ? "Field Type Cannot Be Empty"
                        : "Invalid input on type",
                }),
            url: z.string().url("Invalid URL on media sosial")
        });
        const objectSchemaOnlineShop = z.object({
            type: z.enum(OnlineShopType, {
                error: (iss) =>
                    iss.input === undefined
                        ? "Field Type Cannot Be Empty"
                        : "Invalid input on type",
                }),
            url: z.string().url("Invalid URL on online shop")
        });
        const objectSchemaGaleri = z.object({
            section: z.string({
                error: (iss) =>
                    iss.input === undefined
                        ? "Field Section Cannot Be Empty"
                        : "Invalid input on section",
            }),
            url: z.array(z.string()).min(1, "At least one URL is required in galeri")
        });
        const name = z.string({
            error: (iss) =>
                iss.input === undefined
                    ? "Field Name Cannot Be Empty"
                    : "Invalid input on name",
        }).parse(req.body.name);
        const type = z.enum(UmkmType, {
            error: (iss) =>
                iss.input === undefined ?
                    "Field Type Cannot Be Empty" :
                    "Invalid input on type",
        }).parse(req.body.type);
        const description = z.string({
            error: (iss) =>
                iss.input === undefined
                    ? "Field Description Cannot Be Empty"   
                    : "Invalid input on description",
        }).parse(req.body.description);
        const address = z.string({
            error: (iss) =>
                iss.input === undefined
                    ? "Field Address Cannot Be Empty"
                    : "Invalid input on address",
        }).parse(req.body.location);
        const gmaps = z.string().optional().url("Invalid URL on gmaps").parse(req.body.gmaps);
        const contact = z.string({
            error: (iss) =>
                iss.input === undefined
                    ? "Field Contact Cannot Be Empty"
                    : "Invalid input on contact",
        }).parse(req.body.contact);
        const logo = z.string({
            error: (iss) =>
                iss.input === undefined
                    ? "Field Logo Cannot Be Empty"
                    : "Invalid input on logo",
        }).parse(req.body.logo);
        const online_shop = z.array(objectSchemaOnlineShop).optional().parse(req.body.online_shop);
        const media_sosial = z.array(objectSchemaSocialMedia).optional().parse(req.body.media_sosial);
        const umkm_galeri = z.array(objectSchemaGaleri).optional().parse(req.body.umkm_galeri);
        next()
    } catch (error) {
        if (error instanceof ZodError) {
            res.status(400).json({
                'message': error.issues[0].message
            })
        } else {
            res.status(500).json({
                'message': error.message
            })
        }
    }
}

module.exports = { umkmValidation }