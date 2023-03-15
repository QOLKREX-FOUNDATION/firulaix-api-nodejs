// controller upload and delte files (cloudinary)
const { request, response } = require("express");
const cloudinary = require("cloudinary").v2;
// const path = require("path");
// const fs = require("fs").promises;
// config cloudinary

// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });
cloudinary.config(process.env.CLOUDINARY_URL);

const getFile = async (req = request, res = response) => {
  const { name, chip } = req.body;
  // const urlCloudinary = `https://res.cloudinary.com/worldanireg/image/upload/v1678821563/petimg/${chip}.png`;
  const urlCloudinary = `https://res.cloudinary.com/worldanireg/images/${name}/${chip}.png`;

  try {
    res.status(201).json({
      ok: true,
      message: "File upload",
      urlCloudinary,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error, contact Admin",
    });
  }
};

const uploadFile = async (req = request, res = response) => {
  const { name, chip } = req.body;
  const file = req.files.file;
  // console.log(file, name, chip);
  // console.log("url", url);
  // const url = path.join(__dirname, `../${file.name}`);
  try {
    const { tempFilePath } = file;

    // Upload the temporary file to Cloudinary
    const result = await cloudinary.uploader.upload(tempFilePath, {
      public_id: `images/${name}/${chip}`,
    });

    // Delete the temporary file
    // fs.unlink(tempFilePath);
    const secure_url = result.secure_url;

    res.status(201).json({
      ok: true,
      message: "File upload",
      secure_url,
    });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({
      ok: false,
      msg: "Error, contact Admin",
    });
  }
};

const deleteFile = async (req = request, res = response) => {
  const { public_id } = req.body;

  try {
    const { secure_url } = await cloudinary.uploader.destroy(public_id);

    res.status(201).json({
      ok: true,
      message: "File delete",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error, contact Admin",
    });
  }
};

module.exports = {
  getFile,
  uploadFile,
  deleteFile,
};
