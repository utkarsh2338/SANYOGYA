import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export { cloudinary };

/**
 * Upload a file buffer to Cloudinary.
 * @param fileBuffer - File as Buffer or base64 data URI
 * @param folder - Cloudinary folder (e.g. "profiles", "documents")
 */
export async function uploadToCloudinary(
  fileBuffer: string,
  folder: string
): Promise<{ url: string; publicId: string }> {
  const result = await cloudinary.uploader.upload(fileBuffer, {
    folder: `sanyogya/${folder}`,
    resource_type: "auto",
  });

  return {
    url: result.secure_url,
    publicId: result.public_id,
  };
}

/**
 * Delete an asset from Cloudinary.
 */
export async function deleteFromCloudinary(publicId: string): Promise<void> {
  await cloudinary.uploader.destroy(publicId);
}
