const cloudinary = require("../utils/cloudinary-setup");

const handleUploadImage = async (req, res) => {
  console.log(req.file);
  try {
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "SQIImage",
    });
    console.log(result);
    res.json(result);
  } catch (error) {
    res.json({ message: error });
    console.log(error);
  }
};

module.exports = {
  handleUploadImage,
};
