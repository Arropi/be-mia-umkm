const express = require("express");
const upload = require("../middleware/upload");
const {
  uploadSingleImage,
  uploadMultipleImages,
  deleteImage,
} = require("../controller/uploadController");

const route = express.Router();

// Upload single image
route.post("/single", upload.single("image"), uploadSingleImage);

// Upload multiple images
route.post("/multiple", upload.array("images", 10), uploadMultipleImages);

// Delete image
route.delete("/", deleteImage);

module.exports = route;
