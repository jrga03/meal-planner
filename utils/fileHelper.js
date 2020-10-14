import imageCompression from 'browser-image-compression';

/**
 * Converts file to base64 image
 * @param {object} file - File blob
 * @returns Base64 image
 */
export async function fileToBase64Img(file) {
  const reader = new FileReader();
  const image = new Promise((resolve) => {
    reader.onload = (event) => {
      resolve(event.target.result);
    };
    reader.readAsDataURL(file);
  });

  return await image;
}

// 1 megabyte in bytes
const mbInBytes = 1048576;

/**
 * Convert Mb to bytes
 * @param {number} mb - Number of Mb to convert to bytes
 * @returns {number} Value in bytes
 */
export function mbToBytes(mb) {
  return (Number(mb) * mbInBytes) || 0
}

/**
 * Compresses an image to desired size
 * if `image` is less than desired size, it returns the original image
 *
 * @param {File} image
 * @param {number} size - Size in bytes
 * @returns {File}
 */
export async function compressImage( image, size = mbInBytes ) {
  // Image less than given size
  if ( image.size < size ) return image;

  const options = {
      maxSizeMB: 1
  }
  const compressed = await imageCompression( image, options );
  return compressed;
}
