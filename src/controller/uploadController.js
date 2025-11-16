const { uploadToR2, deleteFromR2 } = require("../service/uploadService");

const uploadSingleImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "No file uploaded",
      });
    }

    const folder = req.body.folder || "uploads";
    const fileUrl = await uploadToR2(
      req.file.buffer,
      req.file.originalname,
      req.file.mimetype,
      folder
    );

    return res.status(200).json({
      message: "File uploaded successfully",
      data: {
        url: fileUrl,
        filename: req.file.originalname,
        mimetype: req.file.mimetype,
        size: req.file.size,
      },
    });
  } catch (error) {
    console.error("Upload error:", error);
    return res.status(500).json({
      message: "Failed to upload file",
      error: error.message,
    });
  }
};

const uploadMultipleImages = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        message: "No files uploaded",
      });
    }

    const folder = req.body.folder || "uploads";
    const uploadPromises = req.files.map((file) =>
      uploadToR2(file.buffer, file.originalname, file.mimetype, folder)
    );

    const fileUrls = await Promise.all(uploadPromises);

    return res.status(200).json({
      message: "Files uploaded successfully",
      data: fileUrls.map((url, index) => ({
        url,
        filename: req.files[index].originalname,
        mimetype: req.files[index].mimetype,
        size: req.files[index].size,
      })),
    });
  } catch (error) {
    console.error("Upload error:", error);
    return res.status(500).json({
      message: "Failed to upload files",
      error: error.message,
    });
  }
};

const deleteImage = async (req, res) => {
  try {
    const { url } = req.body;

    if (!url) {
      return res.status(400).json({
        message: "File URL is required",
      });
    }

    const deleted = await deleteFromR2(url);

    if (deleted) {
      return res.status(200).json({
        message: "File deleted successfully",
      });
    } else {
      return res.status(404).json({
        message: "File not found or already deleted",
      });
    }
  } catch (error) {
    console.error("Delete error:", error);
    return res.status(500).json({
      message: "Failed to delete file",
      error: error.message,
    });
  }
};

module.exports = {
  uploadSingleImage,
  uploadMultipleImages,
  deleteImage,
};
