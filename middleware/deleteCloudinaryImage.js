import cloudinary from "../config/cloudinary.js";

const deleteCloudinaryImage = async (imageUrl) => {
  if (!imageUrl) return;

  try {
    // imageUrl → public_id nikalna
    const parts = imageUrl.split("/");
    const fileName = parts[parts.length - 1];
    const publicId = `courses/${fileName.split(".")[0]}`;

    await cloudinary.uploader.destroy(publicId);
    console.log("Cloudinary image deleted:", publicId);
  } catch (error) {
    console.error("Cloudinary delete error:", error.message);
  }
};

export default deleteCloudinaryImage;
