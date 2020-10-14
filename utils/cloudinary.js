import sha1 from "crypto-js/sha1";

/* eslint-disable no-undef */
const NEXT_PUBLIC_CLOUDINARY_UPLOAD_URL = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_URL;
const NEXT_PUBLIC_CLOUDINARY_API_KEY = process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY;
const NEXT_PUBLIC_CLOUDINARY_API_SECRET = process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET;
/* eslint-enable no-undef */

const DEFAULT_UPLOAD_OPTIONS = {
  format: "png",
  transformation: "q_auto"
};

/**
 * Uploads a file using Cloudinary API
 *
 * @param {Object} file - File to be uploaded
 * @param {Object} [options] - Additional options for the upload
 */
export function upload(file, options = {}) {
  const timestamp = Date.now().toString().substring(0, 10);
  const optionsWithTimestamp = {
    ...DEFAULT_UPLOAD_OPTIONS,
    ...options,
    timestamp
  };
  const signature = generateSignature(optionsWithTimestamp);

  const data = new FormData();
  data.append("file", file);
  data.append("signature", signature);
  data.append("api_key", NEXT_PUBLIC_CLOUDINARY_API_KEY);

  for (const key of Object.keys(optionsWithTimestamp)) {
    data.append(key, optionsWithTimestamp[key]);
  }

  return fetch(NEXT_PUBLIC_CLOUDINARY_UPLOAD_URL, {
    method: "POST",
    body: data
  });
}

/**
 * Generates signature from options
 *
 * @param {Object} options
 * @returns {String} Signature
 */
function generateSignature(options) {
  const sortedKeys = Object.keys(options).sort();
  const keyValuePairString = sortedKeys.map((key) => `${key}=${options[key]}`).join("&");
  const digest = sha1(`${keyValuePairString}${NEXT_PUBLIC_CLOUDINARY_API_SECRET}`);

  return digest;
}
