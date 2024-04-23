const express = require("express");
const { handleUploadImage } = require("../controller/imageUpload");
const multerUploads = require("../utils/multerUpload");

const router = express.Router();

router.post("/uploadImage", multerUploads.single("image"), handleUploadImage);

module.exports = router;
