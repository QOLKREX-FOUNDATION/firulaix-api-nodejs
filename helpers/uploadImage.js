const sharp = require("sharp");

const cloudinary = require("cloudinary").v2;
cloudinary.config(process.env.CLOUDINARY_URL);
const DataURIParser = require("datauri/parser");

const uploadImage = async (image, path) => {
  console.log({ image });
  console.log({ path });
  try {
    const { tempFilePath } = image;
    const optimize = await optimizeImage(tempFilePath);
    const base64 = await bufferToBase64(optimize);
    const { secure_url, public_id } = await cloudinary.uploader.upload(
      base64,
      {
        folder: `images/${ path }`,
      }
    );
    return {
      cloduinaryId: public_id,
      imageUrl: secure_url,
    };
  } catch (error) {
    console.log(error);
    return {
      cloduinaryId: "",
      imageUrl: "",
    };
  }
};
const destroyImage = async (cloduinaryId, path) => {
  try {
    await cloudinary.uploader.destroy(
      // `images/${path}/${cloduinaryId}`,
      `${ cloduinaryId }`,
      (error, result) => {
        console.log(result, error);
      }
    );
    console.log("Image deleted");
    return {
      ok: true,
      msg: "Image deleted",
    };
  } catch (error) {
    console.log("Image not deleted");
    console.log(error);
    return {
      ok: false,
      msg: "Image not deleted",
    };
  }
};

// optimize image using sharp
const optimizeImage = async (image) => {
  return sharp(image)
    .toFormat("webp")
    .toBuffer();
};

const bufferToBase64 = async (buffer) => {
  const parser = new DataURIParser();
  return parser.format(".webp", buffer).content;
  // return buffer.toString("base64");
};

module.exports = {
  uploadImage,
  destroyImage,
};
