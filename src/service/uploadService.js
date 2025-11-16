const { PutObjectCommand, DeleteObjectCommand } = require("@aws-sdk/client-s3");
const { r2Client, R2_BUCKET, R2_PUBLIC_URL } = require("../config/r2Config");
const crypto = require("crypto");
const path = require("path");

/**
 * Upload file to Cloudflare R2
 * @param {Buffer} fileBuffer - File buffer from multer
 * @param {string} originalName - Original filename
 * @param {string} mimeType - File MIME type
 * @param {string} folder - Folder path in R2 (e.g., 'logos', 'galleries')
 * @returns {Promise<string>} - Public URL of uploaded file
 */
const uploadToR2 = async (fileBuffer, originalName, mimeType, folder = "uploads") => {
  try {
    const fileExt = path.extname(originalName);
    const uniqueName = `${Date.now()}-${crypto.randomBytes(8).toString("hex")}${fileExt}`;
    const key = `${folder}/${uniqueName}`;

    const command = new PutObjectCommand({
      Bucket: R2_BUCKET,
      Key: key,
      Body: fileBuffer,
      ContentType: mimeType,
    });

    await r2Client.send(command);

    const publicUrl = `${R2_PUBLIC_URL}/${key}`;
    return publicUrl;
  } catch (error) {
    console.error("Error uploading to R2:", error);
    throw new Error("Failed to upload file to R2");
  }
};

/**
 * Delete file from Cloudflare R2
 * @param {string} fileUrl - Public URL of the file
 * @returns {Promise<boolean>}
 */
const deleteFromR2 = async (fileUrl) => {
  try {
    if (!fileUrl || !fileUrl.includes(R2_PUBLIC_URL)) {
      return false;
    }

    // Extract key from URL
    const key = fileUrl.replace(`${R2_PUBLIC_URL}/`, "");

    const command = new DeleteObjectCommand({
      Bucket: R2_BUCKET,
      Key: key,
    });

    await r2Client.send(command);
    return true;
  } catch (error) {
    console.error("Error deleting from R2:", error);
    return false;
  }
};

module.exports = {
  uploadToR2,
  deleteFromR2,
};
