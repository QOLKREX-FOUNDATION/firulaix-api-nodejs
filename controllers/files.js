// controller upload and delte files (cloudinary)
const { request, response } = require("express");
const cloudinary = require("cloudinary").v2;
// const path = require("path");
// const fs = require("fs").promises;
// config cloudinary
cloudinary.config(process.env.CLOUDINARY_URL);

const getFile = async (req = request, res = response) => {
  const { name, folder } = req.body;
  // const urlCloudinary = `https://res.cloudinary.com/worldanireg/image/upload/v1678821563/petimg/${chip}.png`;
  // const urlCloudinary = `https://res.cloudinary.com/worldanireg/images/${name}/${chip}.png`;

  if (!name || !folder) {
    return res.status(400).json({
      ok: false,
      msg: "name and folder are required",
    });
  }

  // get image from cloudinary

  const image = cloudinary.url(`images/${ folder }/${ name }`, {
    max_results: 1,
    type: "upload",
    format: "png",
    secure: true,
    default_image: "default",
  });

  try {
    res.status(201).json({
      ok: true,
      message: "File upload",
      image,
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
    // find chip in cloudinary and delete

    const imageDelete = await cloudinary.uploader.destroy(
      `images/${ name }/${ chip }`
    );

    console.log("imageDelete", imageDelete);

    // Create a temporary file path

    const { tempFilePath } = file;

    // Upload the temporary file to Cloudinary
    const result = await cloudinary.uploader.upload(tempFilePath, {
      public_id: `images/${ name }/${ chip }`,
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

const uploadFileEr = async (req = request, res = response) => {
  const { folder, name } = req.body;
  const file = req.files.file;
  // const url = path.join(__dirname, `../${file.name}`);
  try {
    // find chip in cloudinary and delete

    const imageDelete = await cloudinary.uploader.destroy(
      `images/${ folder }/${ name }`
    );

    // console.log("imageDelete", imageDelete);

    // Create a temporary file path

    const { tempFilePath } = file;

    // Upload the temporary file to Cloudinary
    const result = await cloudinary.uploader.upload(tempFilePath, {
      public_id: `images/${ folder }/${ name }`,
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
  const { name, chip } = req.body;

  try {
    const { secure_url } = await cloudinary.uploader.destroy(
      `images/${ name }/${ chip }`
    );
    console.log(secure_url);

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
  uploadFileEr,
  deleteFile,
};
