import { v2 as cloudinary } from 'cloudinary';

const cloudName = process.env.CLOUDINARY_CLOUD_NAME || process.env.CLOUDINARY_NAME;
const apiKey = process.env.CLOUDINARY_API_KEY;
const apiSecret = process.env.CLOUDINARY_API_SECRET;

const isConfigured = Boolean(
  cloudName &&
  apiKey &&
  apiSecret &&
  !cloudName.includes('your_') &&
  !apiKey.includes('your_') &&
  !apiSecret.includes('your_')
);

if (isConfigured) {
  cloudinary.config({
    cloud_name: cloudName,
    api_key: apiKey,
    api_secret: apiSecret,
    secure: true
  });
  console.log('\x1b[32m%s\x1b[0m', `[Cloudinary Configured] Connected to cloud: ${cloudName}`);
} else {
  console.warn(
    '\x1b[33m%s\x1b[0m',
    '[Cloudinary Warning] Credentials not found or placeholder values used in .env. Falling back to local storage.'
  );
}

export const isCloudinaryReady = () => isConfigured;

/**
 * Upload a local file path or stream to Cloudinary
 * @param {string} filePath - Absolute path to temporary uploaded file
 * @param {object} options - Options such as folder, resource_type ('image' | 'video' | 'auto')
 */
export const uploadToCloudinary = async (filePath, options = {}) => {
  if (!isConfigured) {
    throw new Error('Cloudinary is not configured in backend environment variables.');
  }

  const defaultOptions = {
    folder: 'blackgrapes_media',
    resource_type: options.resourceType || 'auto',
    use_filename: true,
    unique_filename: true,
    ...options
  };

  return await cloudinary.uploader.upload(filePath, defaultOptions);
};

/**
 * Delete an asset from Cloudinary by public ID
 * @param {string} publicId - The public ID returned by Cloudinary
 * @param {string} resourceType - 'image' or 'video'
 */
export const deleteFromCloudinary = async (publicId, resourceType = 'image') => {
  if (!isConfigured) return null;
  return await cloudinary.uploader.destroy(publicId, { resource_type: resourceType });
};

export default cloudinary;

