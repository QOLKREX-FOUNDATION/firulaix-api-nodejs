const cloudinary = require("cloudinary").v2;
cloudinary.config(process.env.CLOUDINARY_URL);

const uploadImage = async (image, path) => {
  console.log({ image });
  console.log({ path });
  try {
    const { tempFilePath } = image;
    const { secure_url, public_id } = await cloudinary.uploader.upload(
      tempFilePath,
      {
        folder: `images/${path}`,
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
      `${cloduinaryId}`,
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

module.exports = {
  uploadImage,
  destroyImage,
};
